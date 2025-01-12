import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';  // Ensure correct path
import { Class } from '../../models/class.model';  // Ensure correct path
import { Firestore, doc, updateDoc } from '@angular/fire/firestore'; // Import necessary Firestore functions
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-class-list',
  templateUrl: '././class-main.page.html',
  styleUrls: ['././class-main.page.scss'],
})
export class ClassListPage implements OnInit {
  studentName: string = '';
  classes: Class[] = [];  // Correctly define the type as Class[]

  constructor(
    private classService: ClassService,
    private firestore: Firestore,  // Inject Firestore
    private alertController: AlertController
    ) {}

  ngOnInit() {
    this.loadClasses();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Load classes from the ClassService
  async loadClasses() {
    try {
      this.classes = await this.classService.getClasses();  // Correctly assign to the classes array
    } catch (error) {
      console.error('Error loading classes:', error);
    }
  }

  // Add student to a class
  addStudentToClass(classId: string) {
    if (this.studentName.trim()) {
      this.classService.addStudentToClass(classId, this.studentName)
        .then(() => {
          this.loadClasses(); // Reload classes after adding the student
          this.studentName = ''; // Clear the input field
          this.showAlert('Success', 'Student added successfully.');
        })
        .catch((error: any) => console.error('Error adding student to class:', error));  // Add error type
      } else {
      this.showAlert('Error', 'Student name cannot be empty.');
      console.error('Student name cannot be empty');
    }
  }

  // Delete student from class
  deleteStudentFromClass(classId: string, studentId: string) {
    this.classService.deleteStudentFromClass(classId, studentId)
      .then(() => {
        this.loadClasses(); // Reload classes after deleting the student
        this.showAlert('Success', 'The student is deleted successfully.');
      })
      .catch((error: any) => console.error('Error deleting student from class:', error));  // Add error type
  }

  async onUpdateClass(classId: string, className: string) {
    try {
      const classDocRef = doc(this.firestore, 'classes', classId);
      await updateDoc(classDocRef, { name: className });
      this.showAlert('Success', 'Class updated successfully.');
      console.log('Class updated successfully');
      
    } catch (error) {
      console.error('Error updating class:', error);
      this.showAlert('Error', 'Error updating class.');
    }
  }
}
