import Stripe from "stripe"
import { NextApiRequest,NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { options } from "./auth/[...nextauth]"
import { AddCartType } from "@/types/AddCartType"
import { PrismaClient } from "@prisma/client"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:'2022-11-15',
  })
const prisma = new PrismaClient()

const calculateOrderAmount = (items: AddCartType[]) => {

  const itemsWithoutNullUnitAmount = items.map((item) => {
    if (item.unit_amount !== null) {
      // Perform desired action when unit_amount is null
      console.log("Unit amount is null for item:", item);
    }
    return item;
  });
  
  const totalPrice = itemsWithoutNullUnitAmount.reduce((acc, item) => {
    if (item.unit_amount != null && item.quantity != null) {
      return acc + item.unit_amount * item.quantity;
    } else {
      throw new Error("Invalid item: unit_amount or quantity is null");
    }
  }, 0);
  return totalPrice;
};


export default async function handler(req:NextApiRequest,res:NextApiResponse ){
  const userSession = await getServerSession(req,res,options)
  if(!userSession?.user){
    res.status(403).json({message:'Not logged in'})
    return
  }
  const {items,payment_intent_id}=req.body
  console.log(items,payment_intent_id)
  const orderData={
    user:{connect:{id:userSession.id}},
    amount:calculateOrderAmount(items),
    currency:'inr',
    status:'pending',
    paymentIntentId:payment_intent_id, 
    products:{
        create:items.map((item)=>({
            name:item.name,
            description:item.description || null,
            unit_amount:parseFloat(item.unit_amount),
            image:item.image,
            quantity:parseFloat(item.quantity)
        })),
    },
  }
  if(payment_intent_id){
    const current_intent= await stripe.paymentIntents.retrieve(payment_intent_id)
    if(current_intent){
        const updated_intent=await stripe.paymentIntents.update(
            payment_intent_id,
            {
                amount:calculateOrderAmount(items)
            }
        )
        
        const existing_order= await prisma.order.findFirst({
            where:{paymentIntentId:updated_intent.id},
            include:{products:true},
        })
        if(!existing_order){
            res.status(400).json({message:'invalid payment intent '})
        }
       
        const updated_order= await prisma.order.update({
            where:{id:existing_order?.id},
            data:{
                amount:calculateOrderAmount(items),
                products:{
                 deleteMany:{},
                 create:items.map((item)=>({
                    name:item.name,
                    description:item.description || null,
                    unit_amount:parseFloat(item.unit_amount),
                    image:item.image,
                    quantity:parseFloat(item.quantity)
                 })),
                },
            },
            
        })
        res.status(200).json({paymentIntent:updated_intent})
        return
    }
   
  }
  
  else{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:calculateOrderAmount(items),
        currency:'inr',
        automatic_payment_methods:{enabled:true},
    })
    orderData.paymentIntentId=paymentIntent.id
    const newOrder = await prisma.order.create({
        data:orderData,
    })
    res.status(200).json({paymentIntent})

  }
 

}