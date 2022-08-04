import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { ShellComponent } from './Components/shell/shell.component';
import { CartComponent } from './Components/cart/cart.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { AuthGuardService, InterceptorService, LibModule } from '@medi-care/lib';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductTemplateComponent } from './Components/product-template/product-template.component';
import { UserComponent } from './Components/user/user.component';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
const routes: Routes = 
[
  {
    path: '',
    component:ShellComponent,
    children: [
      {
        path: 'HomePage',
        component: HomePageComponent,
      },
      {
        path: 'Products',
        component: AllProductsComponent,
      },
      {
        path: 'Products/:id',
        component: AllProductsComponent,
      },
      {
        path: 'Cart',
        component: CartComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'User',
        component: UserComponent,
        canActivate: [AuthGuardService],
      }
    ]
  }
  
];

const ngimports = [ToolbarModule, ButtonModule, MdbCarouselModule,CardModule,DividerModule,TableModule,InputTextModule];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AllProductsComponent,
    ShellComponent,
    CartComponent,
    ProductTemplateComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    ...ngimports,
    RouterModule.forRoot(routes),
    LibModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
