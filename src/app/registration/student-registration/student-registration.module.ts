import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentRegistrationPageRoutingModule } from './student-registration-routing.module';

import { StudentRegistrationPage } from './student-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentRegistrationPageRoutingModule
  ],
  declarations: [StudentRegistrationPage]
})
export class StudentRegistrationPageModule {}
