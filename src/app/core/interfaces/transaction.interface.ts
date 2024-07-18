export interface ITransaction {
    amount:number
    createdAt:Date
    receiver_name:string
    reciever_account:string
    remaining_balance:number
    sender_account:string
    sender_name:string
    type:string,
    description:string
    _id:string,
    sender_remaining_balance: number,
    reciever_remaining_balance:number,
}