import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherLessonPageRoutingModule } from './teacher-lesson-routing.module';

import { TeacherLessonPage } from './teacher-lesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherLessonPageRoutingModule
  ],
  declarations: [TeacherLessonPage]
})
export class TeacherLessonPageModule {}
