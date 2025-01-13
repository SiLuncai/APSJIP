import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BeginnerLessonRoutingModule } from './beginner-lesson-routing.module';
import { BeginnerLessonComponent } from './beginner-lesson.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeginnerLessonRoutingModule
  ],
  declarations: [BeginnerLessonComponent]
})
export class BeginnerLessonModule {}
