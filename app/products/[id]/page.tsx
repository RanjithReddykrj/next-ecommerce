import { SearchParamTypes } from "@/types/SearchParamTypes"
import formatPrice from "@/util/PriceFormat"
import Image from "next/image"
import AddCart from "../AddCart"
export default async function({searchParams}:SearchParamTypes){
    return(
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 p-12 ">
          <div className="px-10 py-4">
            <Image src={searchParams.image} alt={searchParams.name} width={600} height={600} 
            priority={true}
            className="w-full h-96 object-cover rounded-lg"/>
          </div>


        <div className="font-medium text-grey-700">
            <h1 >{searchParams.name}</h1>
            <p>{searchParams.description}</p>
            <div className="flex gap-2">
              <p className="font-bold text-primary">
                {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
              </p>
            
            </div>


           <AddCart {...searchParams}/>
          
        </div>
      



        </div>
    )
}