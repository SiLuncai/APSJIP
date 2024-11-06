import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherMainPageRoutingModule } from './teacher-main-routing.module';

import { TeacherMainPage } from './teacher-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherMainPageRoutingModule
  ],
  declarations: [TeacherMainPage]
})
export class TeacherMainPageModule {}
