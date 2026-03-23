import { Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../Services/product-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../Interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { YoutubeEmbedComponent } from "../youtube/youtube";
import { MatIcon } from "@angular/material/icon";
import { Product } from "../product/product";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  imports: [CommonModule, YoutubeEmbedComponent, MatIcon, Product],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit{


  productServices=inject(ProductServices)
  products!:Iproduct[]
   product!:Iproduct
   stars = [1,2,3,4,5];
   isShare:boolean=false
   inputValue!:string
  
// mainImage = this.products.images.find((i:any) => i.isMain);
constructor(private route: ActivatedRoute) {}
   
  ngOnInit(): void {
 this.inputValue = window.location.href;
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.productServices.getProductById(id).subscribe({
    next: (res) => {

      this.product = res;

      // بعد ما المنتج يتحمل
      this.productServices.getProductByCat(this.product.category)
        .subscribe({
          next: (related) => {
           
           
            this.products = related.filter((p:any) => p.id !== this.product.id);
          },
          error: (err) => console.log(err)
        });

    },
    error: (err) => console.log(err)
  });
}
  

  currentSlide = 0;




 get sliderImages() {
  return this.product.images.filter((img:any) => !img.isMain);
}

prevSlide() {
  this.currentSlide =
    this.currentSlide === 0
      ? this.sliderImages.length - 1
      : this.currentSlide - 1;
}

nextSlide() {
  this.currentSlide =
    this.currentSlide === this.sliderImages.length - 1
      ? 0
      : this.currentSlide + 1;
}


getCategoryName(category: number): string {
  switch (category) {
    case 0: return 'PC';
    case 1: return 'PS4';
    case 2: return 'PS5';
    case 3: return 'XBOX';
    default: return '';
  }
}

copyLink() {
  navigator.clipboard.writeText(this.inputValue);

  Swal.fire({
    icon: 'success',
    title: 'Copied!',
    text: 'Link copied to clipboard',
    timer: 1500,
    showConfirmButton: false,
    background:"black",
    color:"white"
  });
}
ChangeShare(){
  this.isShare=!this.isShare
}


}

