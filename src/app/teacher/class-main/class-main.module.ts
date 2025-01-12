import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassMainPageRoutingModule } from './class-main-routing.module';

import { ClassListPage } from './class-main.page';  // Use ClassListPage instead of ClassMainPage

@NgModule({
  declarations: [ClassListPage],  // Change ClassMainPage to ClassListPage
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassMainPageRoutingModule,  // Make sure this is correct for routing
  ],
})
export class ClassMainPageModule {}