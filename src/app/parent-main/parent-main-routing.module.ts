import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentMainPage } from './parent-main.page';

const routes: Routes = [
  {
    path: '',
    component: ParentMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentMainPageRoutingModule {}
