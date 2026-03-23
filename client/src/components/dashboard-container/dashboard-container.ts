import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { RouterOutlet} from '@angular/router';
import { DashboardHeader } from "../dashboard-header/dashboard-header";

@Component({
  selector: 'app-dashboard-container',
  imports: [Sidebar, RouterOutlet, DashboardHeader],
  templateUrl: './dashboard-container.html',
  styleUrl: './dashboard-container.css',
})
export class DashboardContainer {
  
  role=localStorage.getItem("role")
 
}
