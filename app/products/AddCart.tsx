'use client'
import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"
import { useState } from "react"
export default function AddCart({name,id,image,unit_amount,quantity}:AddCartType){
    const cartStore=useCartStore()
    const [added,setAdded]=useState(false);
    const handleAdded=()=>{
        cartStore.addProduct({id,name,image,unit_amount,quantity})
        setAdded(true)
        setTimeout(()=>{
            setAdded(false)
        },500)
    }
    return(
        <>
        <button disabled={added} onClick={handleAdded} className="my-4 btn btn-primary w-full" >
            {added && <span>Adding to Cart..</span>}
            {!added && <span>Add to Cart</span>}
        </button>
        </>
    )
}