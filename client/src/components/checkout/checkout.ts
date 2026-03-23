import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartServices } from '../../Services/cart-services';
import { CheckOutServices } from '../../Services/check-out-services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {

  store=inject(Store)
  router=inject(Router)
  cartService=inject(CartServices)
  CheckOutServices=inject(CheckOutServices)
  cartItems!:any
   PayForm!:FormGroup


  copied = false;
  amount:any

 
  constructor(){
    
    
   this.cartService.GetCart().subscribe({
    next:(res)=>{this.cartItems=res.items
      console.log(this.cartItems);
      
    }
   })
    this.PayForm=new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      transactionId:new FormControl('',Validators.required)

    })
  
   
  }

  walletAddress = '12wseBwwgYzjd3rGVCsazwm2PwaeJ3WMb4';
  ngOnInit(): void {
    this.amount=this.store.select("amount")
  }


  copyAddress() {
    navigator.clipboard.writeText(this.walletAddress);
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  }

  onPay() {
 
    const   data = {
    name: this.PayForm.value.name,
    email: this.PayForm.value.email,
    txId: this.PayForm.value.transactionId,
    cartItems: this.cartItems 
  };
 
  
    this.CheckOutServices.Checkout(data).subscribe({
      next:()=>{Swal.fire({
  position: "center",
  icon: "success",
  text: "Your info submited success and admin will check it and send the product to your email",
  showConfirmButton: false,
  timer: 4000,
  background:"#FDC700"
}).then(()=>{ this.cartService.ClearCart().subscribe({
  next:()=>this.router.navigateByUrl("/")
 })});


},
      error:(err)=>console.log(err.error.errors)
      
    })
    
    

    // // call your payment API here
  }

}
