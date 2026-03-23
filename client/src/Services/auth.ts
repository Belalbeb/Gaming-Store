import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../Environment/url';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../Interfaces/UserInfo';
import { Store } from '@ngrx/store';
import { CartServices } from './cart-services';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http=inject(HttpClient)
  cartServices=inject(CartServices)
  signUp(UserInfo:UserInfo):Observable<any>{
    return this.http.post<any>(`${baseUrl}/Auth/register`,UserInfo)

  }
  signIn(UserInfo:any):Observable<any>{
    return this.http.post<any>(`${baseUrl}/Auth`,UserInfo)
  }
  googleSignUp(token: string): Observable<any> {
  return this.http.post(`${baseUrl}/Auth/google`,{token});
}

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login() {

    this.isLoggedInSubject.next(true);
  }

  logout() {
  localStorage.clear()
    this.isLoggedInSubject.next(false);
    this.cartServices.setCartCount(0);


  }
  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
getEmail(userId:string):Observable<any>{
  return this.http.get(`${baseUrl}/Auth/GetEmail/${userId}`)
}
getToken(){
  return localStorage.getItem("token")
}
validateToken(token:string):Observable<any>{
  return this.http.post(`${baseUrl}/Auth/checkToken`,token)
}
}
