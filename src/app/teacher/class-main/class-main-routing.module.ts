import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassListPage } from './class-main.page';  // Use ClassListPage instead of ClassMainPage

const routes: Routes = [
  {
    path: '',
    component: ClassListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassMainPageRoutingModule {}
