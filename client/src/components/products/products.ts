import { Component, inject,OnInit } from '@angular/core';
import { Product } from "../product/product";
import { ProductServices } from '../../Services/product-services';
import { Iproduct } from '../../Interfaces/iproduct';
import { SkeletonLoader } from "../skeleton-loader/skeleton-loader";
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-products',
  imports: [Product, SkeletonLoader],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  productServices=inject(ProductServices)
  products:Iproduct[]=[]
  isLoading:boolean=true
  store=inject(Store)
  filterText!:string
  allProducts!:Iproduct[]
  constructor(){

  }
  ngOnInit(){
    this.productServices.GetAllProduct().subscribe({
      next:(products)=>{
      
        
        
        this.allProducts=products
        this.products=products;
        this.isLoading=false
      
      },
      error:(err)=>console.log(err)
      
  })
this.store.select("text").subscribe((res: string) => {

  if (!this.allProducts.length) return;

  const text = (res || '').toLowerCase().trim();

  this.products = text
    ? this.allProducts.filter(p =>
        p.name.toLowerCase().includes(text) ||
        p.description.toLowerCase().includes(text)
      )
    : [...this.allProducts];

});

  }
}
