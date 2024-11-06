import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  
  {
    path: 'student-main',
    loadChildren: () => import('../student/student-main/student-main.module').then(m => m.StudentMainPageModule)
  },
  {
    path: 'parent-main',
    loadChildren: () => import('../parent/parent-main/parent-main.module').then(m => m.ParentMainPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
