import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrationMainPage } from './registration-main.page';
import { RegistrationMainPageRoutingModule } from './registration-main-routing.module'; // Ensure this path is correct

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationMainPageRoutingModule // Add the routing module here
  ],
  declarations: [RegistrationMainPage]
})
export class RegistrationMainPageModule {}
