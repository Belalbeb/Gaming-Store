import { Component, inject, OnInit } from '@angular/core';
import { OrderServices } from '../../Services/order-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-order.html',
  styleUrl: './admin-order.css',
})
export class AdminOrder implements OnInit {

  orderServices=inject(OrderServices)
  orders:any
  filter:number=1
  allOrders: any
  router=inject(Router)



  ngOnInit(): void {
    this.orderServices.GetAllOrders().subscribe({
      next:(res)=>{
        this.allOrders=res
        this.orders=res
        console.log(this.orders);
        
        
      },
      error:(err)=>console.log(err)
      
    })
  }
 
 
  get completedCount(): number {
    return this.orders.filter((o:any) => o.status === 'completed').length;
  }
 
  get pendingCount(): number {
    return this.orders.filter((o:any) => o.status === 'pending').length;
  }
 
  get rejectedCount(): number {
    return this.orders.filter((o:any) => o.status === 'rejected').length;
  }

 
  onViewDetails(order:any): void {
    console.log('View details for order:', order);
    // Navigate or open dialog here
  }
  getStatus(code:number):string{
    switch (code){
    case 0:return 'Pending'; break;
    case 1:return 'Paid';break;
    case 2:return 'Approved';break;
    default:return 'Rejected'
  }}
filterOption() {

  if (this.filter == 1) {
    this.orders = this.allOrders;
  } else {
    this.orders = this.allOrders.filter((o:any) => o.status == this.filter);
  }



}
GotoDetails(id:any){
  this.router.navigateByUrl(`/dashboard/order-details/${id}`)

  

}
}
