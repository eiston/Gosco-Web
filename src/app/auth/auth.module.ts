/**
 * Created by Eiston on 7/5/2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  providers: [AuthService]
})

export class AuthModule { }
