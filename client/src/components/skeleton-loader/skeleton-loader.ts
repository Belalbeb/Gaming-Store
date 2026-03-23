import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  imports: [CommonModule],
  templateUrl: './skeleton-loader.html',
  styleUrl: './skeleton-loader.css',
})
export class SkeletonLoader implements OnInit {
@Input() size!: number;
skeletonArray: any[] = [];

ngOnInit() {
  this.skeletonArray = Array(this.size);
}

}
