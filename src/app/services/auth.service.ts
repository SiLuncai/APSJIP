import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Register and add user to Firestore
  register(email: string, password: string, userData: any): Observable<User | null> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;

          // Add user data to Firestore
          return setDoc(doc(this.firestore, `users/${user.uid}`), {
            uid: user.uid,
            email: user.email,
            ...userData // Spread additional data from the registration form
          }).then(() => user);
        })
        .catch(error => {
          console.error("Error registering user:", error);
          return null;
        })
    );
  }

  // Login
  login(email: string, password: string): Observable<User | null> {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
        .then(userCredential => userCredential.user)
        .catch(error => {
          console.error("Error signing in:", error);
          return null;
        })
    );
  }

  // Sign Out
  signOut(): Observable<void> {
    return from(signOut(this.auth).catch(error => {
      console.error("Error signing out:", error);
      throw error;
    }));
  }

  // Get current user's UID
  getCurrentUserUid(): string | null {
    const user: User | null = this.auth.currentUser;  // Get the current user
    return user ? user.uid : null;  // Return the UID if user exists, otherwise return null
  }
}
