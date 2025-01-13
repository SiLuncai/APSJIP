import { Component } from '@angular/core'; 
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';  // Firestore imports

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.page.html',
  styleUrls: ['./student-registration.page.scss'],
})
export class StudentRegistrationPage {
  name: string = '';
  email: string = '';
  password: string = '';
  grade: string = '';
  role: string = 'student';
  scode: string = '';
  predefinedCode: string = 's_skbalokbaru'; // Predefined code for validation

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
      // Create the student user account
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Registration successful:', userCredential);

      // Store the student's data in Firestore
      const studentDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(studentDocRef, {
        name: this.name,
        email: this.email,
        grade: this.grade,
        role: this.role,
        createdAt: new Date().toISOString()
      });

      this.router.navigate(['/login']); // Adjust to your desired route
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
