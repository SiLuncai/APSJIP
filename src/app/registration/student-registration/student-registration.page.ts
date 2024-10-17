import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.page.html',
})
export class StudentRegistrationPage {
  student = {
    name: '',
    email: '',
    grade: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Student Registration:', this.student);
    // Add your registration logic here
  }

  goBack() {
    this.router.navigate(['/login']); // Navigate to login page
  }
}
