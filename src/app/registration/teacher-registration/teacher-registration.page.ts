import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.page.html',
  styleUrls: ['./teacher-registration.page.scss'],
})
export class TeacherRegistrationPage {
  name: string = '';
  email: string = '';
  password: string = '';
  subject: string = '';
  scode: string = '';
  predefinedCode: string = 't_skbalok'; // Predefined code for validation

  constructor(private auth: Auth, private router: Router, private alertController: AlertController) {}

  async onSubmit() {
    // Validate the entered code
    if (this.scode !== this.predefinedCode) {
      this.showAlert('Error', 'The code is incorrect. Please enter the correct code.');
      return; // Stop the registration process
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Registration successful:', userCredential);
      
      // You can store additional teacher info in your database if needed

      // Redirect to another page after registration
      this.router.navigate(['/some-other-page']);
    } catch (error: any) { // Handle error (using any type for simplicity)
      console.error('Registration error:', error);
      this.showAlert('Registration Error', error.message);
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Exit']
    });

    await alert.present();
  }
}
