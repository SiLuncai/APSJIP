import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Firestore, deleteDoc, doc, setDoc, getDocs, collection } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-lesson',
  templateUrl: './teacher-lesson.page.html',
  styleUrls: ['./teacher-lesson.page.scss'],
})
export class TeacherLessonPage {
  lessonTitle: string = ''; // Add title for the lesson
  lessonDescription: string = '';
  lessonId: string = uuidv4(); // Unique lesson ID
  lessons: any[] = []; // To store the lessons data

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadLessons();
  }

  // Show error alert
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Handle lesson submission
  async submitLesson() {
    if (this.lessonTitle && this.lessonDescription) {
      try {
        const lessonData = {
          lessonTitle: this.lessonTitle,
          lessonDescription: this.lessonDescription,
          teacherId: this.authService.getCurrentUserUid(), // Assuming you have this method to get the UID
        };

        const lessonDocRef = doc(this.firestore, `lessons/${this.lessonId}`);
        await setDoc(lessonDocRef, lessonData);
        this.showAlert('Success', 'Lesson uploaded successfully.');
        console.log('Lesson uploaded successfully:', lessonData);
        this.loadLessons(); // Reload lessons after submitting a new one
      } catch (error) {
        console.error('Error uploading lesson:', error);
      }
    } else {
      this.showAlert('Error', 'Please provide both a title and a description.');
      console.error('Please provide both a title and a description!');
    }
  }

  // Load lessons from Firestore
  async loadLessons() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'lessons'));
      this.lessons = querySnapshot.docs.map(doc => ({
        id: doc.id,
        lessonTitle: doc.data()['lessonTitle'], // Bracket notation
        lessonDescription: doc.data()['lessonDescription'], // Bracket notation
        isEditing: false,
        newTitle: doc.data()['lessonTitle'], // Bracket notation
        newDescription: doc.data()['lessonDescription'] // Bracket notation
      }));
    } catch (error) {
      console.error('Error loading lessons:', error);
    }
  }

  // Toggle the editing state of the lesson
  toggleEdit(lesson: any) {
    lesson.isEditing = !lesson.isEditing;
    if (!lesson.isEditing) {
      lesson.lessonTitle = lesson.newTitle;
      lesson.lessonDescription = lesson.newDescription;
      this.updateLesson(lesson);
    }
  }

  // Update lesson data in Firestore
  async updateLesson(lesson: any) {
    try {
      const lessonDocRef = doc(this.firestore, `lessons/${lesson.id}`);
      await setDoc(lessonDocRef, {
        lessonTitle: lesson.newTitle,
        lessonDescription: lesson.newDescription
      });
      this.showAlert('Success', 'Lesson updated successfully.');
      console.log('Lesson updated successfully:', lesson);
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  }

  // Delete lesson from Firestore
  async deleteLesson(lessonId: string) {
    try {
      const lessonDocRef = doc(this.firestore, `lessons/${lessonId}`);
      await deleteDoc(lessonDocRef); // Use deleteDoc to delete the document
      this.loadLessons(); // Reload lessons after deletion
      this.showAlert('Success', 'Lesson deleted successfully.');
      console.log('Lesson deleted successfully');
    } catch (error) {
      console.error('Error deleting lesson:', error);
      this.showAlert('Error', 'Error deleting lesson. Please try again.');
    }
  }
}
