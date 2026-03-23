import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Store } from '@ngrx/store';
import { changeIsOpen } from '../../app/Store/isOpen/isOpen.action';

@Component({
  selector: 'app-dashboard-header',
  imports: [MatIcon,CommonModule],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {
  store=inject(Store)
  isSidebarOpen=false
    toggleSidebar(){
      this.store.dispatch(changeIsOpen())
  
}

}
