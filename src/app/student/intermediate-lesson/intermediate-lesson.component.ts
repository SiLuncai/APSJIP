import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-intermediate-lesson',
  templateUrl: './intermediate-lesson.component.html',
  styleUrls: ['./intermediate-lesson.component.scss'],
})
export class IntermediateLessonComponent {
  gridSize: number = 7; // Set grid size to 7 rows
  grid: string[][] = [];
  characterPos: number = Math.floor(this.gridSize / 2); // Start character in the middle row

  constructor(private alertController: AlertController) {
    this.initializeGrid();
  }

  initializeGrid(): void {
    // Create a single-column grid filled with paths (' ')
    this.grid = Array.from({ length: this.gridSize }, () => [' ']);
    // Set finish positions at the top and bottom
    this.grid[0][0] = 'F'; // Top finish
    this.grid[this.gridSize - 1][0] = 'F'; // Bottom finish
    // Set the character's initial position
    this.grid[this.characterPos][0] = 'C';
  }

  moveCharacter(direction: 'up' | 'down'): void {
    const newPos =
      this.characterPos + (direction === 'up' ? -1 : direction === 'down' ? 1 : 0);
  
    if (newPos >= 0 && newPos < this.gridSize) {
      this.grid[this.characterPos][0] = ' '; // Clear the old position
      this.characterPos = newPos;
      if (this.grid[this.characterPos][0] === 'F') {
        this.showCompletionAlert(); // Alert if the character reaches a finish point
      }
      this.grid[this.characterPos][0] = 'C'; // Update the character's new position
    } else {
      this.showErrorAlert('Invalid Move', 'You cannot move outside the grid.');
    }
  }
  

  async showCompletionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Congratulations!',
      message: 'You reached the finish!',
      buttons: ['OK'],
    });
    await alert.present();
    this.initializeGrid(); // Reset the game
  }

  async showErrorAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  getImageSource(row: number): string {
    if (this.grid[row][0] === 'C') {
      return 'assets/maze/character.jfif'; // Character image
    } else if (this.grid[row][0] === 'F') {
      return 'assets/maze/finish.png'; // Finish image
    } else {
      return 'assets/maze/road.jfif'; // Path image
    }
  }
}
