import { Routes } from '@angular/router';
import { Signup } from '../components/signup/signup';
import { Signin } from '../components/signin/signin';
import { Products } from '../components/products/products';
import { Content } from '../components/content/content';
import { Cart } from '../components/cart/cart';
import { Counter } from '../components/counter/counter';
import { WishList } from '../components/wish-list/wish-list';
import { DashboardContainer } from '../components/dashboard-container/dashboard-container';
import { Overview } from '../components/overview/overview';
import { Component } from '@angular/core';
import { Contactus } from '../components/contactus/contactus';
import { Orders } from '../components/orders/orders';
import { Checkout } from '../components/checkout/checkout';
import { ContactusPage } from '../components/contactus-page/contactus-page';
import { AboutUs } from '../components/about-us/about-us';

import { AdminOverview } from '../components/admin-overview/admin-overview';
import { AllProducts } from '../components/all-products/all-products';
import { Details } from '../components/details/details';
import { AddProductComponent } from '../components/add-product/add-product';
import { UpdateProduct } from '../components/update-product/update-product';
import { AdminOrder } from '../components/admin-order/admin-order';
import { OrderDetails } from '../components/order-details/order-details';
import { Discount } from '../components/discount/discount';
import { AuthGuard } from './guards/AuthGuard';



export const routes: Routes = [
    {"path":'',component:Products},
   {
  path: 'dashboard',
component: DashboardContainer,canActivate:[AuthGuard],
  children: [
    // { path: '', redirectTo: 'overview', pathMatch: 'full' }, // ✅ default redirect
    { path: 'user-overview', component: Overview },
    { path: 'contactus', component: Contactus },
    { path: 'user-orders', component: Orders },
    {path:'overview',component:AdminOverview},
    {path:'all-products',component:AllProducts},
    {path:"add-product",component:AddProductComponent},
    {path:"update-product/:id",component:UpdateProduct},
    {path:"admin-orders",component:AdminOrder},
    {path:"order-details/:id",component:OrderDetails},
    {path:"discount",component:Discount}
  ]
},
    {"path":'signup',component:Signup},
    {"path":'signin',component:Signin},
    {"path":'cart',component:Cart},
    {"path":'cart/payment',component:Checkout},
    {"path":'contactus',component:ContactusPage},
    {"path":"aboutus",component:AboutUs},
    {"path":"details/:id",component:Details},


    {"path":"counter",component:Counter},
    {"path":"wishlist",component:WishList},

    

];
