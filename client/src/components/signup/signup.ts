import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Auth } from '../../Services/auth';
import { Router, RouterLink } from '@angular/router';
import { Loading } from "../loading/loading";
declare var google: any;


@Component({
  selector: 'app-signup',
  imports: [MatIcon, CommonModule, ReactiveFormsModule, Loading, RouterLink,FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  AuthServices=inject(Auth)
  router=inject(Router)
   registerForm: FormGroup;
  submitted = false;
  visible:boolean=false
  loading:boolean=false
  error!:string
  

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit() {
  google.accounts.id.initialize({
    client_id: 'google client id',
   
    callback: (response: any) => {
      

      const googleToken = response.credential;
      console.log('Google Token:', googleToken);
      // داخل subscribe على googleService.token$
if (googleToken) {
  this.AuthServices.googleSignUp(googleToken).subscribe({
    next: res => {
       this.AuthServices.login();
        localStorage.setItem('token',res.token)
       localStorage.setItem("userid",res.userId)
      this.router.navigateByUrl('/');
    },
    error: err => console.log('Google login error', err)
  });
}


    }
  });
}


 
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
    

    if (this.registerForm.invalid) {
      return;
    }
    this.loading=true
    this.AuthServices.signUp(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.loading=false
        this.router.navigateByUrl('/signin')

      }
      ,
      error:(err)=>{
        this.loading=false
        this.error=err.error

        console.log(err)}
      
    })

    
  }


  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control && control.errors ? !!control.errors[errorName] : false;
  }
  
  changeVisibility(){
    this.visible=!this.visible
  }
  registerWithGoogle() {


  google.accounts.id.prompt(); 
}

}