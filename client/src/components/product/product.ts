import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Iproduct, ProductCategory } from '../../Interfaces/iproduct';
import { HeartIconComponent } from "../test/test";
import { CommonModule } from '@angular/common';
import { CartServices } from '../../Services/cart-services';
import { AddTocart } from '../../Interfaces/icart';
import { FavouriteServices } from '../../Services/favourite.services';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { Auth } from '../../Services/auth';
import { LoginRequiredDialogComponent } from '../login-required-dialog/login-required-dialog';
import { ProductServices } from '../../Services/product-services';
import Swal from 'sweetalert2';
import { Router, RouterLink } from "@angular/router";
import { Store } from '@ngrx/store';
import { NotificationService } from '../../Services/notification';



@Component({
  selector: 'app-product',
  imports: [MatIcon, HeartIconComponent, CommonModule, MatDialogModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  @Input() product!:Iproduct
  cartServices=inject(CartServices)
  dialog=inject(MatDialog)
  favouriteServices=inject(FavouriteServices)
  authServices=inject(Auth)
  router=inject(Router)
  store=inject(Store)
  filterText!:string
  _notification=inject(NotificationService)
  productService=inject(ProductServices)
  data!:AddTocart
    liked=false;
    userId=localStorage.getItem("userid")


    ngOnInit(): void {
      this.store.select("text").subscribe({
        next:(res)=>{this.filterText=res

          
        }
      })
      
    }
    

  toggleLike(productId:number) {
    
  if (!this.authServices.isLoggedIn()) {

    this.dialog.open(LoginRequiredDialogComponent, {
      width: '400px',
       panelClass: 'custom-dialog-container'
    });

    return; // stop execution
  }
    
    
    
    // this.productService.ChangeLoved(productId,true).subscribe({
    //   next:()=>this.product.loved=true,
    //   error:(err)=>console.log(err)
      
    // })

    this.favouriteServices.AddToFavourite(productId).subscribe({
      next:()=>this.product.loved=true,
      error:(err)=>console.log(err)
      
    })
    
  }
  toggleUnLike(ProductId:number){
        this.liked = false;
    // this.productService.ChangeLoved(ProductId,false).subscribe({
    //   next:()=>this.product.loved=false,
    //   error:(err)=>console.log(err)
      
    // })
    this.favouriteServices.removeFromFavourite(ProductId).subscribe({
      next:()=>this.product.loved=false,
      error:(err)=>console.log(err)
      
    })
    
  }
  

  getCategoryName(categoryNumber: number): string {
    return ProductCategory[categoryNumber];
  }
 AddtoCart(productId: number) {


  if (!this.authServices.isLoggedIn()) {

    this.dialog.open(LoginRequiredDialogComponent, {
      width: '400px',
       panelClass: 'custom-dialog-container'
    });

    return; // stop execution
  }
  this.data = {
   Quantity:1,
    productId: productId,

  };

  this.cartServices.AddToCart(this.data).subscribe({
    next: () => {
      this.cartServices.increaseCartCount();
    
      
this._notification.success("Added to your cart");
  
  },
    error: (err) => console.log(err)
  });
}


NavigateToDetails(id:number){
  this.router.navigateByUrl(`/details/${id}`)
  

}
  }

