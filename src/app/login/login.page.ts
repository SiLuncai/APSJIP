import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth'; // Import User from Firebase
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Import Firestore methods

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private firestore: Firestore // Inject Firestore service to query user data
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // In login.page.ts
onSubmit() {
  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe(
    (userCredential) => {
      if (userCredential) {
        console.log('Login successful:', userCredential);

        const userDocRef = doc(this.firestore, `users/${userCredential.uid}`);
        getDoc(userDocRef).then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const role = userData ? userData['role'] : null;

            if (role === 'teacher') {
              this.router.navigate(['/teacher-main']);
            } else if (role === 'student') {
              this.router.navigate(['/student-main']);
            } else if (role === 'parent') {
              this.router.navigate(['/parent-main']);
            } else {
              this.errorMessage = 'Invalid role';
            }
          } else {
            this.errorMessage = 'User data not found';
          }
        });
      } else {
        this.errorMessage = 'Login failed';
      }
    },
    (error) => {
      this.errorMessage = 'Invalid email or password';
      console.error('Login failed', error);
    }
  );
}

}
