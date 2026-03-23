import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterLink } from "@angular/router";
import {  ElementRef, HostListener } from '@angular/core';
import { Auth } from '../../Services/auth';
import { MatBadgeModule, MatBadge } from '@angular/material/badge';
import { CartServices } from '../../Services/cart-services';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-header',
  imports: [MatIcon, CommonModule, RouterLink, MatBadge],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header implements OnInit{
  cartServices=inject(CartServices)
  authService=inject(Auth)
  router=inject(Router)
  elementRef = inject(ElementRef);
  isMenuOpen = false;
  isLoggedIn=false;
  cartCount=0
  counter!:any
  Info:boolean=false
  email!:string
  
  store=inject(Store)
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleInfo(){
    this.Info=true
    

  }
@HostListener('document:click', ['$event'])
 clickOutside(event: Event) {
  if (!this.elementRef.nativeElement.contains(event.target)) {
    this.Info = false;
  }
}

  closeMenu() {
    this.isMenuOpen = false;
  }
ngOnInit() {

  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      this.Info = false;
      this.isMenuOpen = false;
    }
  });

  if(localStorage.getItem("userid")){
    this.authService.getEmail(localStorage.getItem("userid")!).subscribe({
      next:(res)=>{this.email=res.email}
    })
  }

  this.authService.isLoggedIn$.subscribe(value => {
    this.isLoggedIn = value;
  });

  if(this.authService.isLoggedIn()){
    this.cartServices.GetCart().subscribe({
      next:(res)=>{
        this.cartServices.setCartCount(res.items.length)
      }
    })
  }

  this.counter=this.store.select("counter")
}
  Logout(){
    
    
    this.authService.logout();
    this.router.navigateByUrl("/signin")
    
  }
  goToCart(){
    this.router.navigateByUrl("/cart")


  }

}
