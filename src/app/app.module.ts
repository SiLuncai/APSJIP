import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './login/login.page';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({
      "projectId":"apsjip",
      "appId":"1:430696924397:web:315bef3be309bf3d86f8e4",
      "storageBucket":"apsjip.appspot.com",
      "apiKey":"AIzaSyC0Pq4BeWMxLmF5Q32BIAS2VvvZMQNtb4w",
      "authDomain":"apsjip.firebaseapp.com",
      "messagingSenderId":"430696924397",
      "measurementId":"G-23MR4TJYE7"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
