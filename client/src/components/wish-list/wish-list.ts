import { Component, inject, OnInit } from '@angular/core';
import { FavouriteServices } from '../../Services/favourite.services';
import { Iproduct } from '../../Interfaces/iproduct';
import { Product } from "../product/product";
import { SkeletonLoader } from "../skeleton-loader/skeleton-loader";

@Component({
  selector: 'app-wish-list',
  imports: [Product, SkeletonLoader],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList implements OnInit{
  favouriteServices=inject(FavouriteServices)
 products: Iproduct[] = [];
  isLoading=true
 message:string="WishList Is Empty"

  ngOnInit(): void {
    this.favouriteServices.getFavourite().subscribe({
      next:(res)=>{

        this.products=res.products;
        this.isLoading=false;
        
        
      },
      error:(err)=>console.log(err)
      
    })
  }


}
