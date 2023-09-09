export interface Product{
    id:number,
    title:string,
    description:string,
    price:number,
    image:string,
    rating:Rating,
    category:string
}

interface Rating{
    rate:number,
    count:number
}