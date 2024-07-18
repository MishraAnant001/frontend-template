export interface ITransactionNew{
    _id?:String
    from_account:string,
    to_account:string,
    type:string,
    amount:number,
    description?:string
}