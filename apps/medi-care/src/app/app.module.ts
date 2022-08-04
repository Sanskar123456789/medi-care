import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { IndexComponent } from './Components/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductTypeComponent } from './Components/product-type/product-type.component';
import { ProductTypeNewComponent } from './Components/product-type-new/product-type-new.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductsNewComponent } from './Components/products-new/products-new.component';
import { UserComponent } from './Components/user/user.component';
import { OrderComponent } from './Components/order/order.component';
import {
  AuthGuardService,
  InterceptorService,
  LibModule,
} from '@medi-care/lib';
import { ShellComponent } from './Components/shell/shell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';

import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'Products',
        component: ProductsComponent,
      },
      {
        path: 'Products/Products-new',
        component: ProductsNewComponent,
      },
      {
        path: 'Products/:id',
        component: ProductsNewComponent,
      },
      {
        path: 'ProductsType',
        component: ProductTypeComponent,
      },
      {
        path: 'ProductsType/ProductsType-new',
        component: ProductTypeNewComponent,
      },
      {
        path: 'ProductsType/:id',
        component: ProductTypeNewComponent,
      },
      {
        path: 'Order',
        component: OrderComponent,
      },
      {
        path: 'User',
        component: UserComponent,
      },
      {
        path:'UserDetail/:email',
        component:UserDetailComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    FooterComponent,
    IndexComponent,
    HeaderComponent,
    ProductTypeComponent,
    ProductTypeNewComponent,
    ProductsComponent,
    ProductsNewComponent,
    UserComponent,
    OrderComponent,
    ShellComponent,
    UserDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    LibModule,
    ToastModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    TableModule,
    DividerModule,
    ButtonModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
