import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentRegistrationPageRoutingModule } from './parent-registration-routing.module';

import { ParentRegistrationPage } from './parent-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentRegistrationPageRoutingModule
  ],
  declarations: [ParentRegistrationPage]
})
export class ParentRegistrationPageModule {}
