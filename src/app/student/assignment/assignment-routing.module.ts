import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentPage } from './assignment.page';

const routes: Routes = [
  {
    path: '',
    component: AssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentPageRoutingModule {}
