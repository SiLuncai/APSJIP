import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.page.html',
})
export class TeacherRegistrationPage {
  teacher = {
    name: '',
    email: '',
    subject: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Teacher Registration:', this.teacher);
    // Add your registration logic here
  }

  goBack() {
    this.router.navigate(['/login']); // Navigate to login page
  }
}
