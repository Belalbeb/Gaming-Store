import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { Auth } from '../../Services/auth';

@Component({
  selector: 'app-footer',
  imports: [MatIcon, MatIcon, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  authServices=inject(Auth)
  ngOnInit(): void {
  
  }

}
