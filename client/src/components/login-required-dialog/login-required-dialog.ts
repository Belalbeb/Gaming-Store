import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-login-required-dialog',
  templateUrl: './login-required-dialog.html',
  imports: [MatDialogContent, MatDialogActions, MatIcon]
})
export class LoginRequiredDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<LoginRequiredDialogComponent>,
    private router: Router
  ) {}

  goToLogin() {
    this.dialogRef.close();
    this.router.navigate(['/signin']);
  }
  CloseWindow(){
     this.dialogRef.close();

  }
}