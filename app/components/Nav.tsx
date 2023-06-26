'use client'
import {Session} from 'next-auth'
import {signIn,signOut} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import {AiFillShopping} from 'react-icons/ai'


import {motion,AnimatePresence} from 'framer-motion'
import React from 'react'
import DarkLight from './DarkLight'



export default function Nav({user}:Session) {
  const cartStore=useCartStore();
  return (
    <div>
        <nav className='flex justify-between items-center py-8'>
          <Link href={"/"}>
          <h1 className='font-lobster text-xl'> Styled </h1>
          </Link>
          <ul className='flex items-center gap-12'>
            <li onClick={()=>cartStore.toggleCart()} className="flex items-center text-3xl cursor-pointer relative">
              <AiFillShopping/>
              <AnimatePresence>
              {cartStore.cart.length >0 && (
              <motion.span
              initial={{scale:0}} 
              animate={{scale:1}}
              exit={{scale:0}}
              className='bg-primary text-sm text-white font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'>
                {cartStore.cart.length}
              </motion.span>)}
              </AnimatePresence>          
            </li>

            <DarkLight/>
           {!user &&
           <li className="bg-primary  text-white px-4 py-2  rounded-md">
            <button onClick={()=>signIn()}>SignIn</button>
           </li>
           }
           {
            user && 
            <li>
              <div className="dropdown dropdown-end cursor-pointer">
                <Image 
                src={user.image as string} 
                alt={user.name as string}
                 width={36} height={36}
                 className='rounded-full' 
                 tabIndex={0}
                 />
                 <ul tabIndex={0} className="p-4 shadow space-y-4 menu dropdown-content   bg-base-200 rounded-box w-72">
                  <Link className='hover:bg-base-300 p-4 rounded-md' href={'/'}>Orders</Link>
                  <li onClick={()=>signOut()} className='hover:bg-base-300 p-4 rounded-md' >Sign Out</li>
                 </ul>
              </div>
            </li>
           }

           </ul>
           <AnimatePresence>
           {cartStore.isOpen && <Cart/>}
           </AnimatePresence>
           
        </nav>
      
    </div>
  )
}
