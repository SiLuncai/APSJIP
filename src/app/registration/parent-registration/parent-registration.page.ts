import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-parent-registration',
  templateUrl: './parent-registration.page.html',
})
export class ParentRegistrationPage {
  parent = {
    name: '',
    email: '',
    childName: ''
  };

  constructor(private router: Router) {} // Inject Router

  onSubmit() {
    console.log('Parent Registration:', this.parent);
    // Add your registration logic here
  }

  goBack() {
    this.router.navigate(['/login']); // Navigate to login page
  }
}
