import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeginnerLessonComponent } from './beginner-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: BeginnerLessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeginnerLessonRoutingModule {}
