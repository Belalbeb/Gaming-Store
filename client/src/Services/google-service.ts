import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class GoogleService {
   private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor() {
    this.loadGoogleScript();
  }

  private loadGoogleScript() {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeGoogle();
    document.body.appendChild(script);
  }

  private initializeGoogle() {
    google.accounts.id.initialize({
      client_id: 'google_client', // حط هنا client id بتاعك
      callback: (response: any) => {
        this.tokenSubject.next(response.credential);
      }
    });
  }

  public login() {
    // يظهر popup عند click
    google.accounts.id.prompt();
  }
  
}
