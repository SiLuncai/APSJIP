import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertController } from '@ionic/angular'; // Import AlertController

@Component({
  selector: 'app-parent-registration',
  templateUrl: './parent-registration.page.html',
  styleUrls: ['./parent-registration.page.scss'],
})
export class ParentRegistrationPage {
  name: string = '';
  email: string = '';
  password: string = '';
  phoneno: string = '';
  scode: string = '';
  private predefinedCode: string = 'p_skbalok'; // Predefined code for validation

  constructor(private auth: Auth, private router: Router, private alertController: AlertController) {} // Inject AlertController

  async onSubmit() {
    // Validate the entered code
    if (this.scode !== this.predefinedCode) {
      this.showAlert('Error', 'The code is incorrect. Please enter the correct code.');
      return; // Stop the registration process
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Registration successful:', userCredential);
      
      this.router.navigate(['/login']); // Adjust to your desired route
    } catch (error: any) { // Cast to any
      console.error('Registration error:', error);
      // Show alert for registration errors
      this.showAlert('Registration Error', error.message);
    }
  }
  

  goBack() {
    this.router.navigate(['/login']); // Adjust to your desired route
  }

  // Function to display alert messages
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Exit'] // Button to close the alert
    });

    await alert.present();
  }
}
