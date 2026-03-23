import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decreaseCounter, increaseCounter } from '../../app/Store/counter/counter.action';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter implements OnInit {
  counter!:number
  store=inject(Store);
  ngOnInit(){
    this.store.select("counter").subscribe({
      next:(res)=>this.counter=res
    })

  }
  Increment(){
    this.store.dispatch(increaseCounter())
  }
  
  decrement(){
     this.store.dispatch(decreaseCounter())
  }
}
