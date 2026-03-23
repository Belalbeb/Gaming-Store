import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Checkout } from '../components/checkout/checkout';
import { Observable } from 'rxjs';
import { baseUrl } from '../Environment/url';

@Injectable({
  providedIn: 'root',
})
export class CheckOutServices {
  token=localStorage.getItem("token")
  http=inject(HttpClient)
  Checkout(data:any):Observable<any>{
  return this.http.post<any>(`${baseUrl}/Order/checkout`,data,{
   headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })

  })
}


  
}
