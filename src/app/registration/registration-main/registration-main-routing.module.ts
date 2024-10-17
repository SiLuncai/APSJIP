import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationMainPage } from './registration-main.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationMainPage
  },
  {
    path: 'teacher-registration',
    loadChildren: () => import('../teacher-registration/teacher-registration.module').then(m => m.TeacherRegistrationPageModule)
  },
  {
    path: 'student-registration',
    loadChildren: () => import('../student-registration/student-registration.module').then(m => m.StudentRegistrationPageModule)
  },
  {
    path: 'parent-registration',
    loadChildren: () => import('../parent-registration/parent-registration.module').then(m => m.ParentRegistrationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationMainPageRoutingModule {}
