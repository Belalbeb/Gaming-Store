import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddTocart } from '../Interfaces/icart';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../Environment/url';
import { UpdateCartItem } from '../Interfaces/updateCart';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  http=inject(HttpClient)
  

  setCartCount(count: number) {
    this.cartCount.next(count);
  }

  increaseCartCount() {
    this.cartCount.next(this.cartCount.value + 1);
  }

  decreaseCartCount() {
    this.cartCount.next(this.cartCount.value - 1);
  }

AddToCart(cartData: AddTocart): Observable<any> {
  const token = localStorage.getItem('token');




  return this.http.post(
  `${baseUrl}/cart/add`,
  cartData,
  {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }
);

}
GetCart(): Observable<any> {
  const token = localStorage.getItem('token'); // احنا مخزنينه من وقت login

  return this.http.get(
  `${baseUrl}/cart`,
  
  {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }
);

}
updateCart(data:UpdateCartItem){
    const token = localStorage.getItem('token'); // احنا مخزنينه من وقت login

  return this.http.put(
  `${baseUrl}/cart/update`,data,
  
  {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }
);

}
RemoveItem(productId:number):Observable<any>{

      const token = localStorage.getItem('token'); // احنا مخزنينه من وقت login

  return this.http.delete<any>(
  `${baseUrl}/cart/remove/${productId}`,
  
  {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }
);

}
ClearCart():Observable<any>{

      const token = localStorage.getItem('token'); // احنا مخزنينه من وقت login

  return this.http.delete<any>(
  `${baseUrl}/cart/clear`,
  
  {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }
);

}


  
}
