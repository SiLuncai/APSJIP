export interface Class {
  id: string; // Unique ID for each class (Firestore document ID)
  name: string; // Class name
  students: { id: string, name: string }[]; // List of students in the class
}
