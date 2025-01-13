import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdvancedLessonRoutingModule } from './advanced-lesson-routing.module';
import { AdvancedLessonComponent } from './advanced-lesson.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvancedLessonRoutingModule
  ],
  declarations: [AdvancedLessonComponent]
})
export class AdvancedLessonModule {}
