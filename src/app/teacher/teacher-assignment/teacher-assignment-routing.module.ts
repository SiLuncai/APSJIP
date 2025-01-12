import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherAssignmentPage } from './teacher-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherAssignmentPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherAssignmentPageRoutingModule {}
