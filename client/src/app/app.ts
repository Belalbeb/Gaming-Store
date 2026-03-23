import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Header } from "../components/header/header";
import { Content } from "../components/content/content";
import { Products } from "../components/products/products";
import { Footer } from "../components/footer/footer";
import AOS from 'aos';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardContainer } from "../components/dashboard-container/dashboard-container";
import { Auth } from '../Services/auth';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Content, Products, Footer, DashboardContainer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('experment');
  isHome = false;
  isDashboard=false;
  router = inject(Router);
  authServices=inject(Auth)
  constructor(
  private iconRegistry: MatIconRegistry,
  private sanitizer: DomSanitizer
) {
  this.iconRegistry.addSvgIcon(
    'google',
    this.sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg')
  );
}
  ngOnInit() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  //  const token=localStorage.getItem("token")
  //  if(token){
  //   this.authServices.validateToken(token).subscribe({
  //     error:(err)=>{localStorage.clear();console.log(err);
  //     }
  //   })
  //  }

    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHome = (event.urlAfterRedirects === '/');
       this.isDashboard = event.urlAfterRedirects.startsWith('/dashboard');

      });
  }
}
