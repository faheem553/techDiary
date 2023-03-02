import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {NgConfirmModule} from 'ng-confirm-box';
import { DataService } from './service/data.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    routingComponents,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
NgConfirmModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
