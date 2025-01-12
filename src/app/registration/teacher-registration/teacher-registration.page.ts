import { Component } from '@angular/core'; 
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';  // Firestore imports

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
  role: string = 'teacher';
  scode: string = '';
  predefinedCode: string = 't_skbalok'; // Predefined code for validation

  constructor(
    private auth: Auth, 
    private router: Router, 
    private alertController: AlertController, 
    private firestore: Firestore // Inject Firestore
  ) {}

  async onSubmit() {
    // Validate the entered code
    if (this.scode !== this.predefinedCode) {
      this.showAlert('Error', 'The code is incorrect. Please enter the correct code.');
      return; // Stop the registration process
    }

    try {
      // Create the teacher user account
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Registration successful:', userCredential);

      // Store the teacher's data in Firestore
      const teacherDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(teacherDocRef, {
        name: this.name,
        email: this.email,
        subject: this.subject,
        role: this.role,
        createdAt: new Date().toISOString()
      });

      this.router.navigate(['/login']); // Redirect to the login page after registration
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
