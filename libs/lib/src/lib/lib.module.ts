import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Login/admin-login/admin-login.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
const routes : Routes =[
  {
    path:'Login',
    component:AdminLoginComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    MdbFormsModule,
    FormsModule ,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [MessageService],
  declarations: [AdminLoginComponent],
})
export class LibModule {}
