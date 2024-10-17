import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentRegistrationPage } from './parent-registration.page';

const routes: Routes = [
  {
    path: '',
    component: ParentRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentRegistrationPageRoutingModule {}
