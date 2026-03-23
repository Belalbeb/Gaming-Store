import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminOverview } from "../admin-overview/admin-overview";

import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { changeIsOpen } from '../../app/Store/isOpen/isOpen.action';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, AdminOverview, CommonModule, MatIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
    router=inject(Router)
    store=inject(Store)
    
    isOpen:any
   isSidebarOpen = false;

  
 
    
ngOnInit(): void {
 this.isOpen=this.store.select("isOpen") 

}
    
    role=localStorage.getItem('role')
    @Input() data!:any

  NavigateToOrders(){
    
    this.router.navigateByUrl("/dashboard/user-orders")

  }
    NavigateToContact(){
    this.router.navigateByUrl("/dashboard/contactus")

  }
  NavigateToOverView(){
    this.router.navigateByUrl("/dashboard/user-overview")

  }
  GoToHome(){
    this.router.navigateByUrl('/')
  }
  toggleSidebar(){
  this.store.dispatch(changeIsOpen())
}
NavigateToAdminOrders(){
  this.router.navigateByUrl('/dashboard/admin-orders')
}
    
}
