import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentMainPageRoutingModule } from './parent-main-routing.module';

import { ParentMainPage } from './parent-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentMainPageRoutingModule
  ],
  declarations: [ParentMainPage]
})
export class ParentMainPageModule {}
