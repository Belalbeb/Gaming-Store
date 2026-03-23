import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { discountData } from '../Interfaces/discountData';
import { Observable } from 'rxjs';
import { baseUrl } from '../Environment/url';

@Injectable({
  providedIn: 'root',
})

export class DiscountServices {
  http=inject(HttpClient)


  AddDiscountCode(data:discountData):Observable<any>{
    return this.http.post(`${baseUrl}/Discount`,data);
  }
  getAllDiscount():Observable<any>{
    return this.http.get(`${baseUrl}/Discount`)
  }
  updateDiscount(id:number,data:any):Observable<any>{
    return this.http.put(`${baseUrl}/Discount/${id}`,data)
  }
   deleteDiscount(id:number):Observable<any>{
    return this.http.delete(`${baseUrl}/Discount/${id}`)
  }
}
