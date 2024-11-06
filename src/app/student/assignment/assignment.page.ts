import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage {
  gridSize = 10; // Define grid size
  grid: string[][] = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill('O'));
  characterPos = { row: 0, col: 0 };
  gameMessage = '';
  finishReached = false;

  constructor(private alertController: AlertController) {
    this.initializeGrid();
  }

  initializeGrid() {
    // Initialize grid and set start and finish positions
    this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill('O')); // Reset grid
    this.grid[0][0] = ''; // Starting position
    this.grid[this.gridSize - 1][this.gridSize - 1] = 'F'; // Finish position
    this.createMazeWithDeadEnds();
  }

  generateNewMaze() {
    this.initializeGrid(); // Reset grid and generate new maze
    this.characterPos = { row: 0, col: 0 }; // Reset character position to start
    this.gameMessage = ''; // Clear any previous game messages
    this.finishReached = false; // Reset finish flag
  }

  async showCompletionAlert() {
    const alert = await this.alertController.create({
      header: 'Congratulations!',
      message: 'You reached the finish! Would you like to try a new challenge?',
      buttons: [
        {
          text: 'New Challenge',
          handler: () => {
            this.generateNewMaze();
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

  createMazeWithDeadEnds() {
    let currentRow = 0;
    let currentCol = 0;
    this.grid[currentRow][currentCol] = ''; // Starting point

    // Create a simple path using random moves (right or down)
    while (currentRow < this.gridSize - 1 || currentCol < this.gridSize - 1) {
      // Randomly choose to move down or right, ensuring we stay within bounds
      if (currentRow === this.gridSize - 1) {
        currentCol++;
      } else if (currentCol === this.gridSize - 1) {
        currentRow++;
      } else {
        Math.random() < 0.5 ? currentRow++ : currentCol++;
      }
      this.grid[currentRow][currentCol] = ''; // Mark path
    }

    // Ensure finish is reachable
    this.grid[this.gridSize - 1][this.gridSize - 1] = 'F';

    // Add connected and isolated dead ends
    this.addConnectedDeadEnds(4);  // Add more connected dead ends for challenge
    this.addIsolatedDeadEnds(6);  // Add fewer isolated dead ends
  }

  addConnectedDeadEnds(count: number) {
    let deadEndsAdded = 0;

    while (deadEndsAdded < count) {
      const pathRow = Math.floor(Math.random() * this.gridSize);
      const pathCol = Math.floor(Math.random() * this.gridSize);

      // Ensure the dead end is placed on an open path
      if (this.grid[pathRow][pathCol] === '') {
        const directions = [
          { row: pathRow - 1, col: pathCol }, // Up
          { row: pathRow + 1, col: pathCol }, // Down
          { row: pathRow, col: pathCol - 1 }, // Left
          { row: pathRow, col: pathCol + 1 }  // Right
        ];

        // Pick a random direction and create a dead end
        const potentialDeadEnd = directions[Math.floor(Math.random() * directions.length)];

        if (
          potentialDeadEnd.row >= 0 &&
          potentialDeadEnd.row < this.gridSize &&
          potentialDeadEnd.col >= 0 &&
          potentialDeadEnd.col < this.gridSize &&
          this.grid[potentialDeadEnd.row][potentialDeadEnd.col] === 'O'
        ) {
          this.grid[potentialDeadEnd.row][potentialDeadEnd.col] = ''; // Mark as open path
          deadEndsAdded++;
        }
      }
    }
  }

  addIsolatedDeadEnds(count: number) {
    let isolatedDeadEndsAdded = 0;

    while (isolatedDeadEndsAdded < count) {
      let row = Math.floor(Math.random() * this.gridSize);
      let col = Math.floor(Math.random() * this.gridSize);

      // Avoid the start (0,0) and finish points (gridSize-1, gridSize-1)
      if (this.grid[row][col] !== '' && this.grid[row][col] !== 'F') {
        const directions = [
          { row: row - 1, col: col }, // Up
          { row: row + 1, col: col }, // Down
          { row: row, col: col - 1 }, // Left
          { row: row, col: col + 1 }  // Right
        ];

        // Make sure no adjacent cells are open (isolated)
        if (directions.every(direction => 
          direction.row < 0 || direction.row >= this.gridSize ||
          direction.col < 0 || direction.col >= this.gridSize ||
          this.grid[direction.row][direction.col] !== ''
        )) {
          this.grid[row][col] = 'O'; // Mark as dead-end
          isolatedDeadEndsAdded++;
        }
      }
    }
  }

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

  moveCharacter(direction: string) {
    const { row, col } = this.characterPos;
    let newRow = row;
    let newCol = col;
  
    switch (direction) {
      case 'up': newRow = row > 0 ? row - 1 : row; break;
      case 'down': newRow = row < 9 ? row + 1 : row; break;
      case 'left': newCol = col > 0 ? col - 1 : col; break;
      case 'right': newCol = col < 9 ? col + 1 : col; break;
    }
  
    if (this.grid[newRow][newCol] === 'O') {
      // Show obstacle message if encountered
      this.gameMessage = 'Obstacle encountered! Try another direction.';
      this.showObstacleAlert();
    } else if (this.grid[newRow][newCol] === 'F') {
      // Show success message on reaching the finish
      this.gameMessage = 'Congratulations! You reached the finish!';
      this.finishReached = true;
      this.showCompletionAlert();
    } else {
      // Move the character to new position
      this.characterPos = { row: newRow, col: newCol };
      this.gameMessage = ''; // Clear any previous messages
    }
  }
  
  // Show alert for obstacles
  async showObstacleAlert() {
    const alert = await this.alertController.create({
      header: 'Obstacle Encountered!',
      message: 'Try moving in a different direction.',
      buttons: ['OK']
    });
    await alert.present();
  }  
}
