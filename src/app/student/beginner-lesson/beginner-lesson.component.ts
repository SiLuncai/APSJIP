import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-beginner-lesson',
  templateUrl: './beginner-lesson.component.html',
  styleUrls: ['./beginner-lesson.component.scss'],
})
export class BeginnerLessonComponent {
  gridSize = 7; // Define the grid size (ensure it's odd for a proper middle)
  grid: string[] = []; // Single row grid
  characterPos: number = Math.floor(this.gridSize / 2); // Character's current position (middle of the row)

  constructor(private alertController: AlertController) {
    this.initializeGrid();
  }

  // Initialize the grid
  initializeGrid(): void {
    this.grid = Array(this.gridSize).fill(' '); // Fill the row with paths (' ')
    this.grid[0] = 'F'; // Leftmost cell is a finish
    this.grid[this.gridSize - 1] = 'F'; // Rightmost cell is a finish
    this.grid[this.characterPos] = 'C'; // Place character in the middle
  }

  // Move the character left or right
  moveCharacter(direction: 'left' | 'right'): void {
    const newPos =
      this.characterPos + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0);

    if (newPos >= 0 && newPos < this.gridSize) {
      this.grid[this.characterPos] = ' '; // Clear the old position
      this.characterPos = newPos;
      if (this.grid[this.characterPos] === 'F') {
        this.showCompletionAlert(); // Alert if the character reaches a finish point
      }
      this.grid[this.characterPos] = 'C'; // Update the character's new position
    }
  }

  // Show a completion alert
  async showCompletionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Congratulations!',
      message: 'You reached the finish!',
      buttons: ['OK'],
    });
    await alert.present();
    this.initializeGrid(); // Reset the maze after completion
  }

  // Get the image source for a grid cell
  getImageSource(index: number): string {
    if (this.grid[index] === 'C') {
      return 'assets/maze/character.jfif'; // Character image
    } else if (this.grid[index] === 'F') {
      return 'assets/maze/finish.png'; // Finish image
    }
    return 'assets/maze/road.jfif'; // Path image
  }
}
