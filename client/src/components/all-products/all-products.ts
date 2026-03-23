import { Component, inject, OnInit } from '@angular/core';
import { Iproduct, ProductCategory } from '../../Interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductServices } from '../../Services/product-services';
import { MatIcon } from "@angular/material/icon";
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts implements OnInit {
  peoductServices=inject(ProductServices)
   searchQuery = '';
   router=inject(Router)

  games: Iproduct[] = [
    
  ];
  ngOnInit(): void {
    this.peoductServices.GetAllProduct().subscribe({
next:(res)=>{this.games=res


  
}
    })
  }

  get filteredGames(): Iproduct[] {
    const q = this.searchQuery.toLowerCase();
    return this.games.filter(g =>
      g.name.toLowerCase().includes(q) 
      
    );
  }

  onAction(id: any): void {
    this.router.navigateByUrl(`dashboard/update-product/${id}`)
    

    
  }
  //  PC,
  //   PS4,
  //   PS5,
  //   XBOX

  getCategory(index:number){
    if(index==0)return 'PC'
    if (index==1) return 'PS4'
    if(index==2) return 'PS5'
    

      
    else {
          return 'XBOX'
      
    }


  }

}
