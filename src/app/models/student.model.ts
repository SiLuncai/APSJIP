export interface Student {
    id: string; // ID is a string to match Firestore's document ID
    name: string; // Student's name
    classId: string; // The ID of the class this student belongs to
  }
  