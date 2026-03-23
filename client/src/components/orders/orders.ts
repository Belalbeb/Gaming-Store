import { Component, inject, OnInit } from '@angular/core';
import { OrderServices } from '../../Services/order-services';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})

export class Orders implements OnInit {
  

  OrderServices=inject(OrderServices)
  orders:any


ngOnInit(): void {
  this.OrderServices.GetUserOrder().subscribe({
    next:(res)=>{this.orders=res.orders; console.log(this.orders);
    },
    error:(err)=>console.log(err)
    
    
  })
  
}
getStatusText(status: number): string {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'Paid';
    case 2: return 'Approved';
    case 3: return 'Rejected';
    default: return '';
  }
}

}
