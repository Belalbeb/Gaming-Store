import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CartServices } from '../../Services/cart-services';
import { UpdateCartItem } from '../../Interfaces/updateCart';
import { amountAction } from '../../app/Store/amount/amount.action';

interface CartItem {
  productId: number;
  productName: string;
  category: string;
  images: any;
  price: number;
  quantity: number;
 
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  
  cartItems: CartItem[] = [];
  discountCode: string = '';
  discountPercentage: number = 0;
  cartId!: number;
  data!: UpdateCartItem;
   total:any
   store=inject(Store)

  constructor(
    private router:Router,

    private cartServices: CartServices
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.total=this.store.select("amount")
  }

  loadCartItems(): void {
    this.cartServices.GetCart().subscribe({
      next: (res) => {
        console.log(res);
        
        this.cartItems = res.items;
        this.updateTotal();
      },
      error: (err) => console.log(err)
    });
  }

  increaseQuantity(itemId: number): void {
    const item = this.cartItems.find(i => i.productId === itemId);
    if (item) {
      item.quantity++;
      this.updateTotal();
      // Optional: send to backend
      // this.updateCartBackend(itemId, item.quantity);
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find(i => i.productId === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.updateTotal();
      // Optional: send to backend
      // this.updateCartBackend(itemId, item.quantity);
    }
  }

  removeItem(itemId: number): void {
    this.cartServices.decreaseCartCount()
    this.cartItems = this.cartItems.filter(i => i.productId !== itemId);
    this.updateTotal();
    this.cartServices.RemoveItem(itemId).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateTotal(): void {
    const subtotal = this.getSubtotal();
    const discount = subtotal * (this.discountPercentage / 100);
    const total = Number((subtotal - discount).toFixed(2));
    this.store.dispatch(amountAction({ amount: total }));
  }

  applyDiscount(): void {
    const discountCodes: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME': 15
    };

    const upperCode = this.discountCode.trim().toUpperCase();

    if (discountCodes[upperCode]) {
      this.discountPercentage = discountCodes[upperCode];
      this.updateTotal(); // dispatch عند تغيير الخصم
      alert(`Discount code applied! You saved ${this.discountPercentage}%`);
    } else if (this.discountCode.trim()) {
      alert('Invalid discount code');
    }
  }

  goToCheckout(): void {
    this.router.navigateByUrl('/cart/payment'); // Checkout صفحة منفصلة
  }

  // Optional helper to update backend
  // private updateCartBackend(itemId: number, quantity: number) {
  //   this.data = { productId: itemId, quantity };
  //   this.cartServices.updateCart(this.data).subscribe({
  //     next: res => console.log(res),
  //     error: err => console.log(err)
  //   });
  // }
}