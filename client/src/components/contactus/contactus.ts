import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { NotificationService } from '../../Services/notification';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contactus.html',
  styleUrl: './contactus.css',
})
export class Contactus {

   contactForm:FormGroup
   constructor(private _notification:NotificationService){
    this.contactForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name:  new FormControl('', [Validators.required]),
    message:  new FormControl('', [Validators.required, Validators.minLength(10)])


    })
   }


  submit() {

    

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

this._notification.success("message sent");

    this.contactForm.reset();
  }

}