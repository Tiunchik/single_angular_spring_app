import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './loginpage/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule {
}
