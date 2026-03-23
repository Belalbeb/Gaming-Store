import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Environment/url';

@Injectable({
  providedIn: 'root',
})
export class FavouriteServices {
  http=inject(HttpClient);
  token=localStorage.getItem("token")
  AddToFavourite(productId:number):Observable<any>{
    return this.http.post<any>(`${baseUrl}/Favourite`,productId,{
        headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
      });

  }
    getFavourite():Observable<any>{
      return this.http.get<any>(`${baseUrl}/Favourite`,{
        headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
      })
    }
    removeFromFavourite(productId:any):Observable<any>{
      return this.http.delete(`${baseUrl}/Favourite/removeFavourite/${productId}`,
        {
        headers:new HttpHeaders({
          Authorization:`Bearer ${this.token} `
        })
      }
        

      )
    }
}
    