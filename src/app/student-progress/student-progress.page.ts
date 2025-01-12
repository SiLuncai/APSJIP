import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.page.html',
  styleUrls: ['./student-progress.page.scss'],
})
export class StudentProgressPage implements OnInit {

  studentProgress: {
    id: string;
    name: string;
    assignments: number;
    completed: number;
    progress: number;
    mazeName?: string;
    progressDate?: Date;
  }[] = [];
  isLoading = true;
  userRole: string = '';
  gameMessage: string = '';

  constructor(
    private firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.loadUserRole();
    if (this.userRole === 'student' || this.userRole === 'parent' || this.userRole === 'teacher') {
      await this.loadStudentProgress();
    } else {
      console.log('User is not authorized to view student progress');
      this.gameMessage = 'You do not have permission to view student progress.';
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async loadUserRole() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(this.firestore, 'users', user.uid);
        const querySnapshot = await getDoc(userRef);

        if (querySnapshot.exists()) {
          const userData = querySnapshot.data();
          this.userRole = userData['role'] || '';
        } else {
          console.log('No user found in Firestore');
        }
      }
    } catch (error) {
      console.error('Error loading user role:', error);
    }
  }

  async loadStudentProgress() {
    try {
      const usersRef = collection(this.firestore, 'student_progress');
      const querySnapshot = await getDocs(usersRef);
  
      this.studentProgress = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const studentNameFromFirestore = data['studentName'] || 'Unknown';
        const mazeName = data['mazeName'] || 'N/A';
        const stepCount = typeof data['stepCount'] === 'number' ? data['stepCount'] : 0;
        const progressDate = data['progressDate'] ? data['progressDate'].toDate() : new Date();
  
        return {
          id: doc.id, // Store the document ID
          name: studentNameFromFirestore,
          assignments: 1,
          completed: stepCount,
          progress: 100,
          mazeName: mazeName,
          progressDate: progressDate, // Ensure this is always a Date object
        };
      });
  
      // Sort the array by progressDate in ascending order
      this.studentProgress.sort((a, b) => {
        const dateA = a.progressDate instanceof Date ? a.progressDate.getTime() : 0;
        const dateB = b.progressDate instanceof Date ? b.progressDate.getTime() : 0;
        return dateA - dateB;
      });
  
      console.log(this.studentProgress);
    } catch (error) {
      this.showAlert('Error', 'Error fetching student progress.');
    } finally {
      this.isLoading = false;
    }
  }  

  async deleteProgress(studentId: string) {
    try {
      const studentRef = doc(this.firestore, 'student_progress', studentId);
      await deleteDoc(studentRef);
      this.loadStudentProgress(); // Reload the progress list
      this.showAlert('Success', 'Student progress deleted successfully.');
    } catch (error) {
      console.error('Error deleting student progress:', error);
      this.showAlert('Error', 'Error deleting student progress.');
    }
  }

  onBackButtonClick() {
    if (this.userRole === 'teacher') {
      this.router.navigate(['/teacher-main']);
    } else if (this.userRole === 'parent') {
      this.router.navigate(['/parent-main']);
    } else {
      this.showAlert('Error', 'User role is not teacher or parent.');
    }
  }
}
