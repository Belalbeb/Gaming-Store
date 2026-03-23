import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from "@angular/material/icon";
import { ProductServices } from '../../Services/product-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
  imports: [MatIcon, FormsModule, ReactiveFormsModule]
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  router=inject(Router)

  // الملفات
  cardImageFile: File | null = null;
  productImagesFiles: File[] = [];

  constructor(private fb: FormBuilder, private _productServices: ProductServices) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      Trailer_Link: ['',Validators.required],
      price: ['', Validators.required],
      releaseDate: [''],
      description: ['',Validators.required],
      rate: ['',Validators.required],
      category:['',Validators.required]
    });
  }

  // اختيار صورة الكارد
  onCardImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.cardImageFile = event.target.files[0];
    }
  }

  // اختيار صور المنتج المتعددة
  onProductImagesSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.productImagesFiles = Array.from(event.target.files);
    }
  }

  // إرسال الفورم
  submitProduct() {
    if (this.productForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formData = new FormData();

    // إضافة الحقول العادية
    Object.keys(this.productForm.controls).forEach(key => {
      const value = this.productForm.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    // إضافة Card Image
    if (this.cardImageFile) {
      formData.append('CardImage', this.cardImageFile, this.cardImageFile.name);
    }

    // إضافة Product Images
    this.productImagesFiles.forEach(file => {
      formData.append('ProductImages', file, file.name);
    });
   for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    


       this._productServices.addProduct(formData).subscribe({
        next:(res)=>this.router.navigateByUrl('/'),
        error:(err)=>console.log(err)
        
        
       })
  }
}