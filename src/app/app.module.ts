import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Import IonicModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './login/login.page'; // Adjust the path if necessary

@NgModule({
  declarations: [
    AppComponent,
    LoginPage // Declare the LoginPage here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    IonicModule.forRoot() // Initialize Ionic
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
