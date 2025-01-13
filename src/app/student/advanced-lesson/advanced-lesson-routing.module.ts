import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedLessonComponent } from './advanced-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedLessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedLessonRoutingModule { }
