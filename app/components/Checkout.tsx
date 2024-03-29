'use client'
import {loadStripe,StripeElementsOptions} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore} from '@/store'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
const stripePromise=loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
)
export default function Checkout(){
    const cartStore=useCartStore()  
    const router=useRouter()
    const [clientSecret,setCLientSecret] = useState('')
    useEffect(()=>{
        fetch('/api/create-payment-intent',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                items:cartStore.cart,
                payment_intent_id:cartStore.paymentIntent
            }),
        }).then((res)=>{
            if(res.status === 403){
                return router.push('/api/auth/signin') 
            }
            return res.json()
        }).then((data)=>{
           setCLientSecret(data.paymentIntent.client_secret)
           cartStore.setPaymentIntent(data.paymentIntent.id)
        }).then((err)=>console.log(err))
    },[])

    return(
        <div>
            <h1>Check Out</h1>
        </div>
    )
}