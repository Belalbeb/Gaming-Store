import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../Environment/url';
import { Observable, ObservableLike } from 'rxjs';
import { Iproduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  http=inject(HttpClient)

  GetAllProduct():Observable<Iproduct[]>{
   return this.http.get<Iproduct[]>(`${baseUrl}/Product`)
  }
  ChangeLoved(id:number,liked:boolean):Observable<any>{
    return this.http.put<any>(`${baseUrl}/Product/${id}`,liked)
  }
  getProductById(id:number):Observable<any>{
    return this.http.get<any>(`${baseUrl}/Product/${id}`)
  }
    getProductByCat(cat:number):Observable<any>{
    return this.http.get<any>(`${baseUrl}/Product/getbycat/${cat}`)
  }
  addProduct(formdata:any):Observable<any>{
    return this.http.post(`${baseUrl}/Product/create`,formdata)
  }
  updateProduct(id:number,data:any):Observable<any>{
    return this.http.put(`${baseUrl}/Product/update/${id}`,data)
  }
  getAllcatsCount():Observable<any>{
    return this.http.get(`${baseUrl}/Product/getCategories`)
  }
}
