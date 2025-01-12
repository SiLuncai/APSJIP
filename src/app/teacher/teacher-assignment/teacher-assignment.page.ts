import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Firestore, collection, query, where, addDoc, getDoc,getDocs, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-teacher-assignment',
  templateUrl: './teacher-assignment.page.html',
  styleUrls: ['./teacher-assignment.page.scss'],
})
export class TeacherAssignmentPage implements OnInit {
  gridSize = 10;
  grid: string[][] = Array(this.gridSize)
    .fill(null)
    .map(() => Array(this.gridSize).fill('O'));
  finishPos = { row: 9, col: 9 }; // Initial finish position
  startPos = { row: 0, col: 0 }; // Initial start position
  currentRow = 0;
  currentCol = 0;
  mazes: any[] = [];
  selectedMaze: any | null = null;

  constructor(
    private alertController: AlertController,
    private firestore: Firestore
  ) { }

  ngOnInit() {
    this.initializeGrid();
    this.loadMazes();
  }

  initializeGrid() {
    this.grid[this.startPos.row][this.startPos.col] = 'S';
    this.grid[this.finishPos.row][this.finishPos.col] = 'F'; // Ensure only one finish
  }

  async loadMazes() {
    try {
      const mazesRef = collection(this.firestore, 'mazes');
      const querySnapshot = await getDocs(mazesRef);
      this.mazes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isEditing: false,
        newTitle: doc.data()['title'] || '',
      }));
    } catch (error) {
      console.error('Error loading mazes:', error);
    }
  }

  toggleCell(row: number, col: number) {
    if (this.grid[row][col] !== 'S' && this.grid[row][col] !== 'F') {
      this.grid[row][col] = this.grid[row][col] === 'O' ? 'P' : 'O';
    }
  }

  async saveMaze() {
    const alert = await this.alertController.create({
      header: 'Save Maze',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Enter maze title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async (data) => {
            if (!data.title) {
              this.showAlert('Error', 'Maze title cannot be empty.');
              return;
            }
  
            const flattenedGrid = ([] as string[]).concat(...this.grid);
            const mazeData = {
              title: data.title,
              grid: flattenedGrid
            };
            const mazesRef = collection(this.firestore, 'mazes');
  
            try {
              await addDoc(mazesRef, mazeData);
              this.loadMazes();
              this.showSaveAlert();
            } catch (error) {
              console.error('Error saving maze:', error);
              this.showAlert('Error', 'Error in saving maze.');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  async deleteMaze(mazeId: string) {
    try {
      const mazeDocRef = doc(this.firestore, 'mazes', mazeId);
      await deleteDoc(mazeDocRef);
      this.mazes = this.mazes.filter((maze) => maze.id !== mazeId);
    } catch (error) {
      console.error('Error deleting maze:', error);
    }
  }

  async updateMazeTitle(mazeId: string, newTitle: string) {
    try {
      // Step 1: Get the current maze name
      const mazeDocRef = doc(this.firestore, 'mazes', mazeId);
      const mazeDocSnapshot = await getDoc(mazeDocRef);
      const currentMazeName = mazeDocSnapshot.exists() ? mazeDocSnapshot.data()['title'] : null;
  
      if (!currentMazeName) {
        await this.showAlert('Error', 'Maze document does not exist.');
        return;
      }
  
      // Early return if the new title is the same as the current title
      if (currentMazeName === newTitle) {
        console.log('No update required. Current title and new title are the same.');
        return;
      }
  
      console.log(`Current maze name: ${currentMazeName}`);
  
      // Step 2: Check if the new title already exists
      const mazesRef = collection(this.firestore, 'mazes');
      const mazeQuery = query(mazesRef, where('title', '==', newTitle));
      const mazeQuerySnapshot = await getDocs(mazeQuery);
  
      if (!mazeQuerySnapshot.empty) {
        await this.showAlert('Error', `Maze name "${newTitle}" already exists. Please choose a different name.`);
        return;
      }
  
      console.log(`Maze name "${newTitle}" is available.`);
  
      // Step 3: Retrieve student progress records with the current maze name
      const progressRef = collection(this.firestore, 'student_progress');
      const q = query(progressRef, where('mazeName', '==', currentMazeName));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log(`No student progress records found for maze: ${currentMazeName}. Updating maze title only.`);
      } else {
        console.log(`Found ${querySnapshot.size} student progress records for maze: ${currentMazeName}. Proceeding with updates.`);
      }
  
      // Step 4: Update maze title in the 'mazes' collection
      await updateDoc(mazeDocRef, { title: newTitle });
  
      // Step 5: Update maze name in the local mazes array
      const maze = this.mazes.find((m) => m.id === mazeId);
      if (maze) {
        maze.title = newTitle;
        maze.isEditing = false;
      }
  
      // Step 6: Update mazeName in all student progress entries (if any)
      if (!querySnapshot.empty) {
        const updates = querySnapshot.docs.map((docSnapshot) => {
          const progressDocRef = doc(this.firestore, 'student_progress', docSnapshot.id);
          return updateDoc(progressDocRef, { mazeName: newTitle });
        });
        await Promise.all(updates);
        console.log('Successfully updated student progress records.');
      }
  
      console.log('Successfully updated maze title.');
      await this.showAlert('Success', `Maze name updated successfully. ${querySnapshot.empty ? '' : 'Student progress records were also updated.'}`);
    } catch (error) {
      console.error('Error updating maze title and student progress:', error);
      await this.showAlert('Error', 'An error occurred while updating maze title and student progress.');
    }
  }
   

  resetGrid() {
    this.grid = Array(this.gridSize)
      .fill(null)
      .map(() => Array(this.gridSize).fill('O'));
    this.initializeGrid();
  }

  viewMaze(maze: any) {
    this.selectedMaze = {
      ...maze,
      grid: this.unflattenGrid(maze.grid),
    };
  }

  unflattenGrid(flattenedGrid: string[]): string[][] {
    const grid = [];
    for (let i = 0; i < flattenedGrid.length; i += this.gridSize) {
      grid.push(flattenedGrid.slice(i, i + this.gridSize));
    }
    return grid;
  }

  getImageSource(row: number, col: number): string {
    if (this.grid[row][col] === 'S') {
      return 'assets/maze/character.jfif';
    } else if (this.grid[row][col] === 'F') {
      return 'assets/maze/finish.png';
    } else if (this.grid[row][col] === 'P') {
      return 'assets/maze/road.jfif';
    } else {
      return 'assets/maze/sand.jpg';
    }
  }

  getImageSourceFromCell(cell: string): string {
    if (cell === 'S') {
      return 'assets/maze/character.jfif';
    } else if (cell === 'F') {
      return 'assets/maze/finish.png';
    } else if (cell === 'P') {
      return 'assets/maze/road.jfif';
    } else {
      return 'assets/maze/sand.jpg';
    }
  }

  async showSaveAlert() {
    const alert = await this.alertController.create({
      header: 'Maze Saved!',
      message: 'Your maze has been saved successfully.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  toggleEdit(maze: any) {
    maze.isEditing = !maze.isEditing;
    if (!maze.isEditing) {
      if (maze.title !== maze.newTitle) {
        this.updateMazeTitle(maze.id, maze.newTitle);
      }
    }
  }  
}
