import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentMainPage } from './student-main.page';

const routes: Routes = [
  {
    path: '',
    component: StudentMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentMainPageRoutingModule {}
