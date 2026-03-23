import { Component, inject, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../Interfaces/iproduct';
import { ProductServices } from '../../Services/product-services';
import { MatIcon } from "@angular/material/icon";
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-product',
  imports: [MatIcon, FormsModule, ReactiveFormsModule,CommonModule ],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit {


  id!:string
  route=inject(ActivatedRoute)
  product!:Iproduct
  productservices=inject(ProductServices)
  productForm!: FormGroup;
  router=inject(Router)
  CardImage:any
  cardImagePreview: string | null = null;
  productImagesPreviews: string[]= [];

  // الملفات
  cardImageFile: File | null = null;
  productImagesFiles: File[] = [];

  constructor(private fb: FormBuilder, private _productServices: ProductServices) {

    
        this.productForm = this.fb.group({
      name: ['', Validators.required],
      Trailer_Link: ['',Validators.required],
      price: ['', Validators.required],
      releaseDate: [''],
      description: ['',Validators.required],
      rate: ['',Validators.required],
    });
  }


  ngOnInit(): void {
       this.id = this.route.snapshot.paramMap.get('id')!;
       this.productservices.getProductById(Number(this.id)).subscribe({
        next:(res)=>{this.product=res
          console.log(this.product);
          this.CardImage=this.product.images.find((img:any)=>img.isMain)
          console.log(this.CardImage);
          
          
          
          this.productForm.patchValue({
  name: this.product.name,
  price: this.product.price,
  description: this.product.description,
  Trailer_Link:this.product.trailor_Link,
  releaseDate:this.product.releaseDate,
  rate:this.product.rate
});

          
        },
        error:(err)=>console.log(err)
        
       })

    
  }
   onCardImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.cardImageFile = event.target.files[0];
      this.cardImagePreview = URL.createObjectURL(this.cardImageFile!);
      console.log(this.cardImagePreview);
      
      
    }
  }


  // اختيار صور المنتج المتعددة
  onProductImagesSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.productImagesFiles = Array.from(event.target.files);
        this.productImagesPreviews = this.productImagesFiles.map(file => URL.createObjectURL(file));
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
 


       this._productServices.updateProduct(this.product.id,formData).subscribe({
        next:(res)=>this.router.navigateByUrl('/dashboard/all-products'),
        error:(err)=>console.log(err)
        
        
       })
  }




}
