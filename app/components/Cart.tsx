'use client'
import Image from 'next/image'
import { useCartStore } from '@/store'
import formatPrice from '@/util/PriceFormat'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import Purchase from "@/public/purchase.png"
import {motion,AnimatePresence} from 'framer-motion'
import Checkout from './Checkout'
import {IoArrowBackCircle} from 'react-icons/io5'
export default function Cart() {
    const cartStore = useCartStore()
    const totalPrice=cartStore.cart.reduce((acc,item)=>{
        return acc + item.unit_amount! * item.quantity!
    },0)
    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
            onClick={() => cartStore.toggleCart()}
            className="fixed w-full h-screen left-0 top-0 bg-black/25"
        >
            {/* <h1>Cart</h1> */}
            <motion.div
            layout
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className="bg-base-100 absolute right-0  top-0 w-full lg:w-2/5 h-screen p-12 overflow-y-scroll "
            >
                <IoArrowBackCircle onClick={()=>cartStore.toggleCart()} className='cursor-pointer text-2xl' />
                <button onClick={()=>cartStore.toggleCart()} 
                className='text-sm font-bold pb-12'>
                    Back to Store
                </button>
                {cartStore.onCheckout==='cart' && (<div>
                    {cartStore.cart.map((item) => (
                    <motion.div layout key={item.id} className="flex p-4 my-4 rounded-lg gap-4 bg-base-200">
                        <Image
                            className="rounded-md h-24"
                            src={item.image}
                            alt={item.name}
                            width={120}
                            height={120}
                        />
                        <div>
                            <h2>{item.name}</h2>
                            <div className="flex gap-4">
                                <h2>Quantity:{item.quantity}</h2>
                                <button
                                    onClick={() => {
                                        cartStore.addProduct({
                                            id: item.id,
                                            name: item.name,
                                            image: item.image,
                                            quantity: item.quantity,
                                            unit_amount: item.unit_amount,
                                        })
                                    }}
                                >
                                    <IoAddCircle className='text-xl' />
                                </button>
                                <button
                                    onClick={() => {
                                        cartStore.removeProduct({
                                            id: item.id,
                                            name: item.name,
                                            image: item.image,
                                            quantity: item.quantity,
                                            unit_amount: item.unit_amount,
                                        })
                                    }}
                                >
                                    <IoRemoveCircle className='text-xl' />
                                </button>
                            </div>

                            <p className="text-sm">
                                {item.unit_amount && formatPrice(item.unit_amount)}
                            </p>
                        </div>
                    </motion.div>
                ))}
                </div>
                )}
                
              
                {cartStore.cart.length > 0 && (
                    <motion.div layout> 
                         <p>Total : {formatPrice(totalPrice)}
                     <button onClick={()=>null} className="py-4 mt-4 bg-primary w-full rounded-md text-white">
                        Checkout
                    </button></p>
                    </motion.div>
                   
                )}
                 {cartStore.onCheckout==="checkout" && <Checkout/>}
                
                {
                    !cartStore.cart.length &&(
                        <motion.div
                        animate={{scale:1,rotateZ:0,opacity:0.75}}
                        initial={{scale:0.5,rotateZ:-10,opacity:0}}
                        exit={{scale:0.5,rotateZ:-10,opacity:0}}
                         className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'>
                        <h1>oh cart is empty 🥲</h1>
                        <Image src={Purchase} alt="empty cart" width={200} height={200} />
                        </motion.div>
                    )
                }
            </motion.div>
        </motion.div>
    )
}
