import { Product } from "./Product";
import { user } from "./user";

export class Order{
    order_id?:number;
	items?:[Product];
	total_price?:number;
	razorpay_id?:string;
	paid?:boolean;
	user_id?:user;
}