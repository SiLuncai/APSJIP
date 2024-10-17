import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Home', url: '/home', icon: 'home' },
    // Add other pages here
  ];

  labels = ['Family', 'Friends', 'Notes', 'Work']; // Example labels
}
