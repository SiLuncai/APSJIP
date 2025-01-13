import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IntermediateLessonRoutingModule } from './intermediate-lesson-routing.module';
import { IntermediateLessonComponent } from './intermediate-lesson.component';

@NgModule({
  declarations: [IntermediateLessonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntermediateLessonRoutingModule,
  ],
})
export class IntermediateLessonModule {}
