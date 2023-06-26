export type ProductType={
    name:string
    unit_amount:number | null
    quantity?:number | 1
    image:string
    id:string
    description:string |null
    currency:string
    metadata:MetadataType
}
type MetadataType={
    features:string
}