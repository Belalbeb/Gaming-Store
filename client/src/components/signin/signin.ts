import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Auth } from '../../Services/auth';
import { Router, RouterLink } from '@angular/router';
import { Loading } from "../loading/loading";
declare var google: any;
@Component({
  selector: 'app-signin',
  imports: [MatIcon, CommonModule, ReactiveFormsModule, Loading, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  AuthServices=inject(Auth)
  router=inject(Router)
   registerForm: FormGroup;
  submitted = false;
  visible:boolean=false
  loading:boolean=false
  error:string=""

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
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


      // next: send token to backend
    }
  });
}
LoginWithGoogle(){
   google.accounts.id.prompt();
}
  

  // Custom validator to check if passwords match

  onSubmit() {
    this.submitted = true;

    

    if (this.registerForm.invalid) {
      return;
    }
    this.loading=true
   
    this.AuthServices.signIn(this.registerForm.value).subscribe({
      next:(res)=>{
        this.AuthServices.login();
        localStorage.setItem("token",res.token)
        localStorage.setItem("userid",res.userId)
        localStorage.setItem('role',res.roles)

        this.loading=false
        this.router.navigateByUrl('/')

      }
      ,
      error:(err)=>{
        this.loading=false;
        this.error=err.error

        console.log(err)}
      
    })

    
  }

  // Helper function for template-friendly validation
  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control && control.errors ? !!control.errors[errorName] : false;
  }
  
  changeVisibility(){
    this.visible=!this.visible
  }

}
