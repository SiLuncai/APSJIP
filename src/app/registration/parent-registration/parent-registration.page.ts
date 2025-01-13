import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  role: string = 'parent';
  scode: string = '';
  private predefinedCode: string = 'p_skbalokbaru';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  async onSubmit() {
    // Validate the entered code
    if (this.scode !== this.predefinedCode) {
      this.showAlert('Error', 'The code is incorrect. Please enter the correct code given by the school.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(this.firestore, `users/${user.uid}`), {
        uid: user.uid,
        name: this.name,
        email: this.email,
        phoneno: this.phoneno,
        role: this.role,
        scode: this.scode
      });

      console.log('Registration successful:', userCredential);
      this.router.navigate(['/login']); // Adjust to your desired route
    } catch (error: any) {
      console.error('Registration error:', error);
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
      buttons: ['Exit']
    });

    await alert.present();
  }
}
