import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StudentMainPageRoutingModule } from './student-main-routing.module';
import { StudentMainPage } from './student-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentMainPageRoutingModule
  ],
  declarations: [StudentMainPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentMainPageModule {}
