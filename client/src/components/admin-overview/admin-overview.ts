import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { NgApexchartsModule } from "ng-apexcharts";
import { ProductServices } from '../../Services/product-services';

@Component({
  selector: 'app-admin-overview',
  imports: [MatIcon, RouterLink,NgApexchartsModule],
  templateUrl: './admin-overview.html',
  styleUrl: './admin-overview.css',
})
export class AdminOverview implements OnInit{
  chartOptions:any;
  productServices=inject(ProductServices)
  ngOnInit(){
this.productServices.getAllcatsCount().subscribe({
  next:(res)=>{
    this.chartOptions = {
  series: res,
  chart: {
    type: "donut",
    height: 350
  },
  labels: ["PC", "PS5", "XBOX","PS4"],
  legend: {
    position: "bottom"
  }
};

  }
})




}

  router=inject(Router)
  NavigateToAllProducts(){
    this.router.navigateByUrl('/dashboard/all-products')

  }
  NavigateToAddNewProduct(){

  }
  NavigateToOrders(){
    
  }

}
