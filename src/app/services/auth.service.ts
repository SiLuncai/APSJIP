import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): Observable<any> {
    // Mock login logic: replace this with real authentication logic
    if (email === 'test@example.com' && password === 'password') {
      return of({ success: true }); // Simulate successful login
    }
    return of({ success: false }); // Simulate failed login
  }
}
