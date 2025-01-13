import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegistrationMainPage } from './registration/registration-main/registration-main.page';
import { TeacherRegistrationPage } from './registration/teacher-registration/teacher-registration.page';
import { StudentRegistrationPage } from './registration/student-registration/student-registration.page';
import { ParentRegistrationPage } from './registration/parent-registration/parent-registration.page';
import { AssignmentPage } from './student/assignment/assignment.page';
import { LessonPage } from './student/lesson/lesson.page';
import { TeacherAssignmentPage } from './teacher/teacher-assignment/teacher-assignment.page';
import { ParentMainPage } from './parent/parent-main/parent-main.page';
import { StudentMainPage } from './student/student-main/student-main.page';
import { BeginnerLessonComponent  } from './student/beginner-lesson/beginner-lesson.component';
import { AdvancedLessonComponent } from './student/advanced-lesson/advanced-lesson.component';
import { IntermediateLessonComponent } from './student/intermediate-lesson/intermediate-lesson.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'registration', component: RegistrationMainPage },
  { path: 'registration/teacher-registration', component: TeacherRegistrationPage },
  { path: 'registration/student-registration', component: StudentRegistrationPage },
  { path: 'registration/parent-registration', component: ParentRegistrationPage },
  { path: 'student/assignment', component: AssignmentPage },
  { path: 'student/lessons', component: LessonPage },
  { path: 'student-progress', loadChildren: () => import('./student-progress/student-progress.module').then(m => m.StudentProgressPageModule) },
  
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
    loadChildren: () => import('./parent/parent-main/parent-main.module').then( m => m.ParentMainPageModule)
  },
  {
    path: 'student-main',
    loadChildren: () => import('./student/student-main/student-main.module').then( m => m.StudentMainPageModule)
  },
  {
    path: 'lesson',
    loadChildren: () => import('./student/lesson/lesson.module').then( m => m.LessonPageModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('./student/assignment/assignment.module').then( m => m.AssignmentPageModule)
  },
  {
    path: 'teacher-main',
    loadChildren: () => import('./teacher/teacher-main/teacher-main.module').then( m => m.TeacherMainPageModule)
  },
  {
    path: 'teacher-lesson',
    loadChildren: () => import('./teacher/teacher-lesson/teacher-lesson.module').then( m => m.TeacherLessonPageModule)
  },
  {
    path: 'teacher-assignment',
    loadChildren: () => import('./teacher/teacher-assignment/teacher-assignment.module').then(m => m.TeacherAssignmentPageModule)
  }, 
  {
    path: 'class-management',
    loadChildren: () => import('./teacher/class-management/class-management.module').then( m => m.ClassManagementPageModule)
  },
  {
    path: 'class-main',
    loadChildren: () => import('./teacher/class-main/class-main.module').then( m => m.ClassMainPageModule)
  },
  {
    path: 'student-progress',
    loadChildren: () => import('./student-progress/student-progress.module').then( m => m.StudentProgressPageModule)
  },
  {
    path: 'beginner-lesson',
    loadChildren: () => import('./student/beginner-lesson/beginner-lesson.module').then(m => m.BeginnerLessonModule)
  },
  {
    path: 'intermediate-lesson',
    loadChildren: () =>
      import('./student/intermediate-lesson/intermediate-lesson.module').then(
        (m) => m.IntermediateLessonModule
      ),
  },
  
  {
    path: 'advanced-lesson',
    loadChildren: () => import('./student/advanced-lesson/advanced-lesson.module').then(m => m.AdvancedLessonModule)
  }
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
