export interface Iproduct {
    id:number
    name:string,
    images:any,
    price:number,
    description:string,
    category:ProductCategory,
    trailor_Link:string,
    loved:boolean,
    rate:number,
    releaseDate:Date
}
 export enum ProductCategory{
    PC,
    PS4,
    PS5,
    XBOX

}
