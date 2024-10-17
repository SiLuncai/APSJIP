import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegistrationMainPage } from './registration/registration-main/registration-main.page';
import { TeacherRegistrationPage } from './registration/teacher-registration/teacher-registration.page';
import { StudentRegistrationPage } from './registration/student-registration/student-registration.page';
import { ParentRegistrationPage } from './registration/parent-registration/parent-registration.page';
import { ParentMainPage } from './parent-main/parent-main.page';
import { StudentMainPage } from './student-main/student-main.page';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'registration', component: RegistrationMainPage },
  { path: 'registration/teacher-registration', component: TeacherRegistrationPage },
  { path: 'registration/student-registration', component: StudentRegistrationPage },
  { path: 'registration/parent-registration', component: ParentRegistrationPage },
 

  
  // Optional: If you still want to use lazy loading, remove the direct component paths above

  {
    path: 'registration-main',
    loadChildren: () => import('./registration/registration-main/registration-main.module').then(m => m.RegistrationMainPageModule)
  },
  {
    path: 'teacher-registration',
    loadChildren: () => import('./registration/teacher-registration/teacher-registration.module').then(m => m.TeacherRegistrationPageModule)
  },
  {
    path: 'student-registration',
    loadChildren: () => import('./registration/student-registration/student-registration.module').then(m => m.StudentRegistrationPageModule)
  },
  {
    path: 'parent-registration',
    loadChildren: () => import('./registration/parent-registration/parent-registration.module').then(m => m.ParentRegistrationPageModule)
  },
  {
    path: 'parent-main',
    loadChildren: () => import('./parent-main/parent-main.module').then( m => m.ParentMainPageModule)
  },
  {
    path: 'student-main',
    loadChildren: () => import('./student-main/student-main.module').then( m => m.StudentMainPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
