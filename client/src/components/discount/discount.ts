import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";
import { DiscountServices } from '../../Services/discount-services';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-discount',
  imports: [MatIcon, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './discount.html',
  styleUrl: './discount.css',
})
export class Discount implements OnInit{
 discountForm:FormGroup
 updateDiscountForm:FormGroup
 discountServices=inject(DiscountServices)
 discounts:any
 selectedId!:number
 updateForm=false
 constructor(){
  this.discountForm=new FormGroup({
    "code":new FormControl('',Validators.required),
    "percentage":new FormControl('',Validators.required)

  });
  this.updateDiscountForm=new FormGroup({
    "isActive":new FormControl('',Validators.required),
    "percentage":new FormControl('',Validators.required)

  });
 }
 ngOnInit(): void {
  this.getDiscounts();

 }
getDiscounts(){
     this.discountServices.getAllDiscount().subscribe({
    next:(res)=>{this.discounts=res
      console.log(res);
      
    },
    error:(err)=>console.log(err)
    
   })

}
  AddDiscount=false
OpenAddCopun(){

  if(!this.AddDiscount){
    this.discountForm.reset()
  }

  this.AddDiscount = !this.AddDiscount

}
  AddDiscountCode(){
    this.discountServices.AddDiscountCode(this.discountForm.value).subscribe({
      next:()=>{
            Swal.fire({
  title: "Added Success",
  icon: "success",
  draggable: true,
  background:"white",
  
  
});
    this.AddDiscount=!this.AddDiscount
    this.discountForm.reset()
    this.getDiscounts()
  

      },
      error:(err)=>{
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
   console.log(err);
   
      }
    })

 
  
  }
  deleteDiscount(id:number){
   
    this.discountServices.deleteDiscount(id).subscribe({
      next:()=>{Swal.fire({
  title: "Deleted Success",
  icon: "success",
  draggable: true,
  background:"white",
  
  
})
    this.getDiscounts()
},
    error:(err)=>Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
})
    })

  }
CloseCopun(){
  this.updateForm=!this.updateForm
}
updateDiscount(discount:any){
    this.updateForm=!this.updateForm
    this.selectedId=discount.id
      this.updateDiscountForm.patchValue({
    percentage: discount.percentage,
    isActive: discount.isActive
  })


}
update(){
      this.discountServices.updateDiscount(this.selectedId,this.updateDiscountForm.value).subscribe({
      next:()=>{
        this.updateForm=!this.updateForm;
        this.getDiscounts()
        Swal.fire({
  title: "updated Success",
  icon: "success",
  draggable: true,
  background:"white",
  
  
})

      }
      ,
          error:(err)=>Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
})
    })
    

}

}
