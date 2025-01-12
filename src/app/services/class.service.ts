import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
} from '@angular/fire/firestore';
import { Class } from '../models/class.model'; // Adjust the path to your actual model location

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private firestore: Firestore) {}

  // Get classes from Firestore
  async getClasses(): Promise<Class[]> {
    try {
      const classesRef = collection(this.firestore, 'classes');
      const querySnapshot = await getDocs(classesRef);

      const classes: Class[] = [];
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const studentsRef = collection(this.firestore, 'classes', doc.id, 'students');
        const studentSnapshot = await getDocs(studentsRef);
        const students = studentSnapshot.docs.map(studentDoc => ({
          id: studentDoc.id,
          name: studentDoc.data()['name'],
        }));

        classes.push({
          id: doc.id,
          name: data['name'],
          students,
        });
      }
      return classes;
    } catch (error) {
      console.error('Error fetching classes:', error);
      return [];
    }
  }

  // Add a class to Firestore
  async addClass(className: string): Promise<void> {
    try {
      const classesRef = collection(this.firestore, 'classes');
      await addDoc(classesRef, { name: className });
      console.log('Class added successfully');
    } catch (error) {
      console.error('Error adding class:', error);
    }
  }

  // Check if a student exists in the 'users' collection
  async checkIfStudentExists(studentName: string): Promise<boolean> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('name', '==', studentName), where('role', '==', 'student'));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking if student exists:', error);
      return false;
    }
  }

  // Add a student to a class
  async addStudentToClass(classId: string, studentName: string): Promise<void> {
    try {
      // Query the "users" collection to find a student by name and role "student"
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('name', '==', studentName), where('role', '==', 'student'));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        console.error('Student does not exist or is not a student');
        return;
      }

      // Retrieve the student data
      const studentDoc = userSnapshot.docs[0];
      const studentData = studentDoc.data();
      const studentId = studentDoc.id;

      // Add the student to the class's 'students' sub-collection
      const studentRef = doc(this.firestore, `classes/${classId}/students`, studentId);
      await setDoc(studentRef, {
        name: studentData['name'],
        id: studentId,
      });

      console.log(`Student "${studentData['name']}" added to class ${classId}`);
    } catch (error) {
      console.error('Error adding student to class:', error);
    }
  }
  
  // Delete a class
  async deleteClass(classId: string): Promise<void> {
    try {
      const classRef = doc(this.firestore, 'classes', classId);
      await deleteDoc(classRef);
      console.log('Class deleted successfully');
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  }

  // Delete a student from a class
  async deleteStudentFromClass(classId: string, studentId: string): Promise<void> {
    try {
      const studentRef = doc(this.firestore, `classes/${classId}/students`, studentId);
      await deleteDoc(studentRef);
      console.log('Student removed from class');
    } catch (error) {
      console.error('Error deleting student from class:', error);
    }
  }

  async updateClass(classId: string, className: string): Promise<void> {
    try {
      const classDocRef = doc(this.firestore, 'classes', classId);
      await updateDoc(classDocRef, { name: className });
      console.log('Class updated successfully');
    } catch (error) {
      console.error('Error updating class:', error);
    }
  }
}
