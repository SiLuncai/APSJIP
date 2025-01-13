import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntermediateLessonComponent } from './intermediate-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: IntermediateLessonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntermediateLessonRoutingModule {}
