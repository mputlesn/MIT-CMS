import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import Swal from 'sweetalert2';
import { ImagesComponent } from './pages/images/images.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule ,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'image', component: ImagesComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
