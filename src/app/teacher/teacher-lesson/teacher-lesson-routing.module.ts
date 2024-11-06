import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherLessonPage } from './teacher-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherLessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherLessonPageRoutingModule {}
