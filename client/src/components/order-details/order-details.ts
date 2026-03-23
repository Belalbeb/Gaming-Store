import { HttpHandler } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { OrderServices } from '../../Services/order-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {
  route=inject(ActivatedRoute)
    @Output() closed = new EventEmitter<void>();
  orderServices=inject(OrderServices)
  id:any
  order:any
  Status!:number
  router=inject(Router)
   

  
  ngOnInit(): void {
     this.id = this.route.snapshot.paramMap.get('id')!;
     this.orderServices.GetByOrderId(this.id).subscribe({
      next:(res)=>{this.order=res
        console.log(this.order);
        this.Status=res.status
        
      },
      error:(err)=>console.log(err.error.errors)
      
     })

    
  }

  

 
  onClose() {
    this.closed.emit();
  }
 
  onBackdropClick(event: MouseEvent) {
    this.onClose();
  }
 
  truncate(value: string, maxLength: number): string {
    if (!value) return '—';
    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  }
 
  getStatus(code:number):string{
    switch (code){
    case 0:return 'Pending'; break;
    case 1:return 'Paid';break;
    case 2:return 'Approved';break;
    default:return 'Rejected'
  }}

  acceptOrder(id:number){
  this.orderServices.ApproveOrder(id).subscribe(()=>{
    this.Status=2
  })
}

rejectOrder(id:number){
  this.orderServices.RejectOrder(id).subscribe(()=>{
    this.onClose()
      this.Status=3
      this.router.navigateByUrl('/dashboard/admin-orders')
      
  })
}

}
