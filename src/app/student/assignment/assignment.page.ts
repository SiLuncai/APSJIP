import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Firestore, collection, query, getDocs, addDoc } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router'; // Import Router to navigate
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage {
  gridSize = 10; // Define grid size
  grid: string[][] = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill('O')); // Initialize grid with obstacles
  characterPos = { row: 0, col: 0 }; // Starting position
  finishPos = { row: 9, col: 9 }; // Finish position
  stepCount = 0; // Step counter
  gameMessage = ''; // Game message
  mazes: any[] = []; // Array to store all mazes fetched from Firestore
  selectedMaze: any; // Store the selected maze data

  constructor(private alertController: AlertController,
    private firestore: Firestore,
    private router: Router) {
    this.loadMazes(); // Load the list of saved mazes (teacher-created mazes)
  }

  // Show error alert
  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Load all saved mazes from Firestore
  async loadMazes() {
    try {
      const mazesRef = collection(this.firestore, 'mazes');
      const q = query(mazesRef); // Query the maze collection
      const querySnapshot = await getDocs(q); // Fetch all maze documents

      if (!querySnapshot.empty) {
        this.mazes = querySnapshot.docs.map(doc => doc.data());
        if (this.mazes.length > 0) {
          // Automatically select the first maze as default
          this.selectedMaze = this.mazes[0];
          this.setMaze(this.selectedMaze);
        }
      } else {
        this.showErrorAlert('No saved mazes found.');
      }
    } catch (error) {
      this.showErrorAlert('Error loading mazes.');
      this.gameMessage = 'Failed to load mazes.';
    }
  }

  // Set the selected maze as the current maze
  setMaze(mazeData: any) {
    if (Array.isArray(mazeData['grid'])) {
      const flatGrid = mazeData['grid'];
      this.grid = [];
      for (let i = 0; i < flatGrid.length; i += this.gridSize) {
        this.grid.push(flatGrid.slice(i, i + this.gridSize));
      }
      console.log('Selected maze grid set successfully:', this.grid);
      this.characterPos = { row: 0, col: 0 }; // Reset character position
      this.stepCount = 0; // Reset steps
    } else {
      console.log('Grid format is incorrect.');
    }
  }

  // Move the character in the maze
  moveCharacter(direction: string) {
    const { row, col } = this.characterPos;
    let newRow = row;
    let newCol = col;

    switch (direction) {
      case 'up': newRow = row > 0 ? row - 1 : row; break;
      case 'down': newRow = row < this.gridSize - 1 ? row + 1 : row; break;
      case 'left': newCol = col > 0 ? col - 1 : col; break;
      case 'right': newCol = col < this.gridSize - 1 ? col + 1 : col; break;
    }

    // Check if the new position is a valid move (not an obstacle)
    if (this.grid[newRow][newCol] === 'O') {
      this.gameMessage = 'Obstacle encountered! Try another direction.';
    } else if (this.grid[newRow][newCol] === 'F') {
      this.gameMessage = 'Congratulations! You reached the finish!';
      this.showCompletionAlert();
    } else {
      this.characterPos = { row: newRow, col: newCol };
      this.stepCount += 1;
      this.gameMessage = ''; // Clear message if move is valid
    }
  }

  // Update the showCompletionAlert function to only display step count
  async showCompletionAlert() {
    const alert = await this.alertController.create({
      header: 'Congratulations!',
      message: `You reached the finish in ${this.stepCount} steps!`,
      buttons: [
        {
          text: 'Finish', // Corrected button text
          handler: () => {
            this.saveProgress(); // Save progress with step count
            this.router.navigate(['/student-main']); // Navigate back to the student-main page
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  // Save progress with the step count
  async saveProgress() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Check if user is logged in
      if (!user) {
        this.showErrorAlert('No user is logged in.');
        console.log('No user is logged in');
        this.gameMessage = 'Please log in to save progress.';
        return;
      }

      // Fetch user data from Firestore to check for role
      const userRef = doc(this.firestore, 'users', user.uid);
      console.log(user.uid); // Assuming users collection stores role and name
      const querySnapshot = await getDoc(userRef);

      if (querySnapshot.exists()) {
        const userData = querySnapshot.data();
        const studentName = userData['name'] || user.displayName || user.email || 'Unknown Student'; // Retrieve name or fallback
        const userRole = userData['role']; // Retrieve role (student, teacher, etc.)

        if (userRole !== 'student') {
          this.showErrorAlert('The logged-in user is not a student.');
          this.gameMessage = 'You must be a student to save progress.';
          return;
        }

        // Make sure maze data is selected before proceeding
        if (!this.selectedMaze) {
          this.gameMessage = 'Please select a maze to play.';
          return;
        }

        // Validate stepCount (ensure it's a valid non-negative integer)
        if (this.stepCount === undefined || this.stepCount < 0) {
          this.gameMessage = 'Invalid step count. Please try again.';
          return;
        }

        const studentProgressRef = collection(this.firestore, 'student_progress');
        const mazeName = this.selectedMaze?.title || 'Unnamed Maze';

        console.log('Saving progress with data:', {
          studentId: user.uid,
          studentName: studentName,  // Ensure this is set
          mazeName: mazeName,
          stepCount: this.stepCount,
          progressDate: new Date(),
        });

        // Save progress to Firestore
        await addDoc(studentProgressRef, {
          studentId: user.uid,
          studentName: studentName,
          mazeName: mazeName,
          stepCount: this.stepCount,
          progressDate: new Date(),
        });
        this.gameMessage = 'Progress saved successfully!';
      } else {
        this.gameMessage = 'Failed to fetch user data.';
      }
    } catch (error) {
      this.gameMessage = 'Failed to save progress. Please try again.';
    }
  }

  // Get image for each grid element
  getImageSource(row: number, col: number): string {
    if (row === this.characterPos.row && col === this.characterPos.col) {
      return 'assets/maze/character.jfif';  // Image for character
    } else if (this.grid[row][col] === 'O') {
      return 'assets/maze/sand.jpg';  // Image for obstacle
    } else if (this.grid[row][col] === 'F') {
      return 'assets/maze/finish.png';  // Image for finish
    } else {
      return 'assets/maze/road.jfif';  // Image for path
    }
  }

  // Select a maze to play
  selectMaze(maze: any) {
    this.selectedMaze = maze;
    this.setMaze(maze); // Load the selected maze
  }
}
