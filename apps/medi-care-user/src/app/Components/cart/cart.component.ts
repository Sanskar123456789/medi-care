import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService, ProdServiceService, Product, user, UserService } from '@medi-care/lib';
import { Subject, takeUntil } from 'rxjs';

declare const Razorpay:any;

@Component({
  selector: 'medi-care-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit,OnDestroy {
  constructor(private prodService: ProdServiceService,
              private OrderService: OrderService,
              private UserService:UserService
              ) {}

  cart = [];
  prods:Product[] = [];
  total_price = 0;
  endsub$ :Subject<any> = new Subject();
  User:user={};

  ngOnInit(): void {
    this._getCartItems();
    this._getUserDetails();
  }

  ngOnDestroy(){
    this.endsub$.next;
    this.endsub$.complete();
  }

  private _getCartItems(){
    const cartItems = localStorage.getItem('Cart')
    if(cartItems)
    this.cart = JSON.parse(cartItems);

    this.cart.forEach(item => {
      this.prodService.getProduct(item).pipe(takeUntil(this.endsub$)).subscribe(data=> {
        this.prods.push(data);
        if(data.price)
        this.total_price+=data.price;
      });
    })    
  }

  private _getUserDetails(){
    const email = localStorage.getItem('userEmail');
    if(email)
    this.UserService.getUserByEmail(email).pipe(takeUntil(this.endsub$)).subscribe(data =>{
      this.User=data;
    })
  }

  removeCart(id:number){
    const newCart:number[] = [];
    this.cart.forEach(ids =>{
      if(ids != id) {
        newCart.push(ids);
      }
    })
    console.log(newCart);
    localStorage.setItem('Cart', JSON.stringify(newCart));
    this.prods=[];
    this.total_price=0;
    this._getCartItems();
  }

  generateOnlineOrder(){
    const id = localStorage.getItem('userEmail');
    if(id){
      this.OrderService.addOnlineOrder(this.prods,id).pipe(takeUntil(this.endsub$)).subscribe(data => {
        console.log(data);
        
        const options = {
          "key": "rzp_test_Pxq4Afj7JVq5wY", // Enter the Key ID generated from the Dashboard
          "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": `${data.currency}`,
          "name": "UANDI",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": `${data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "callback_url": "http://localhost:8008/checkOrder",
          "prefill": {
              "name": `${this.User.name}`, 
              "email": `${this.User.email}`,
              "contact": `${this.User.phone_no}`
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();

      })
    }
  }
}
