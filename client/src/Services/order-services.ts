import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Environment/url';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {

  http=inject(HttpClient)
   token=localStorage.getItem("token")

  GetUserOrder():Observable<any>{


    return this.http.get<any>(`${baseUrl}/Order/getUserOrder`,{
         headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
    })


  }

  GetAllOrders():Observable<any>{
    return this.http.get<any>(`${baseUrl}/Order`,{
         headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
    })

  }
  GetByOrderId(id:any):Observable<any>{
  return  this.http.get<any>(`${baseUrl}/Order/getbyid/${id}`,{
         headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
    })
}

ApproveOrder(id:any):Observable<any>{
  return this.http.get(`${baseUrl}/Order/Accept/${id}`,{
         headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
    })
}
RejectOrder(id:any):Observable<any>{
  return this.http.get(`${baseUrl}/Order/Reject/${id}`,{
         headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
    })
}
  
}
