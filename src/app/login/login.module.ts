import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    IonicModule, // Add this
    ReactiveFormsModule, // Add this
    // ... other imports
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}