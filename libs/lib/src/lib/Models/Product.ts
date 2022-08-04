import { prod_type } from "./Prod_type";

export class Product{
    prod_id?:number;
	price?:number;
	type?:prod_type;
	description?:string;
	image_url?:string;
	prod_name?:string;
	cloud_id?:string;
}