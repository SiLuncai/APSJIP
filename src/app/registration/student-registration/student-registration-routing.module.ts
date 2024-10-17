import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentRegistrationPage } from './student-registration.page';

const routes: Routes = [
  {
    path: '',
    component: StudentRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRegistrationPageRoutingModule {}
