import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, OrderService } from '@medi-care/lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'medi-care-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit,OnDestroy {
  constructor(private OrderService: OrderService) {}

  endsub$ :Subject<any> = new Subject();
  orders:Order[] = [];
  ngOnDestroy(){
    this.endsub$.next;
    this.endsub$.complete();
  }
  ngOnInit(): void {
    this._getOrder();
  }

  private _getOrder(){
    this.OrderService.getAllOrder().pipe(takeUntil(this.endsub$)).subscribe(order => {
      this.orders = order;
    })
  }
}
