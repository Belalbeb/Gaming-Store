import { Component, inject,  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  router=inject(Router)

  NavigateToOrders(){
    this.router.navigateByUrl("/dashboard/orders")

  }
    NavigateToContact(){
    this.router.navigateByUrl("/dashboard/contactus")

  }

}
