import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import Link from "next/link"
import { ProductType } from "@/types/ProductTypes"
export default function Product({id,
    name,
    unit_amount,
    image,
    description,
    metadata,
    currency
    }:ProductType){
        const {features}=metadata;
    return(
      
        <Link href={{pathname:`/products/${id}`,query:{name,image,unit_amount,id,description,features}}}>
        <div>        
           
            <Image priority={true} src={image} alt={name} width={800} height={800} className="w-full h-96 object-cover rounded-lg"/>
            <div className="font-medium py-2">
            <h1>{name}</h1>
            <h2>{description}</h2>
            <h2>{features}</h2>
            <h2 className="text-sm text-primary">{unit_amount != null ? formatPrice(unit_amount):'N/A'}</h2>

            </div>
           
        </div>
        </Link>
    )
}
