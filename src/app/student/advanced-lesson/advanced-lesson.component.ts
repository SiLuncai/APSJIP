import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced-lesson',
  templateUrl: './advanced-lesson.component.html',
  styleUrls: ['./advanced-lesson.component.scss'],
})
export class AdvancedLessonComponent {
  gridSize: number = 5;
  grid: string[][] = [];
  characterPos = { row: 0, col: 0 };
  finishPos = { row: this.gridSize - 1, col: this.gridSize - 1 };

  constructor(
    private alertController: AlertController,
    private firestore: Firestore,
    private router: Router
  ) {
    this.initializeGrid();
    this.generateMaze();
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array(this.gridSize).fill('O')
    );
    this.grid[this.characterPos.row][this.characterPos.col] = 'S'; // Start position
    this.grid[this.finishPos.row][this.finishPos.col] = 'F'; // Finish position
  }

  generateMaze() {
    let isValidMaze = false;
  
    while (!isValidMaze) {
      // Reset the grid to all obstacles
      this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill('O'));
  
      // Set start and finish points
      this.grid[this.characterPos.row][this.characterPos.col] = 'S';
      this.grid[this.finishPos.row][this.finishPos.col] = 'F';
  
      let stack = [{ row: this.characterPos.row, col: this.characterPos.col }];
      let visited = new Set<string>();
      visited.add(`${this.characterPos.row},${this.characterPos.col}`);
      let path = [{ row: this.characterPos.row, col: this.characterPos.col }];
  
      // Create a complete path from start to finish
      while (stack.length > 0) {
        let current = stack.pop();
        if (current) {
          let { row, col } = current;
          let directions = this.shuffleArray([
            { row: row + 1, col },
            { row: row - 1, col },
            { row, col: col + 1 },
            { row, col: col - 1 },
          ]);
  
          for (let next of directions) {
            if (this.isValidPathCell(next.row, next.col, visited)) {
              this.grid[next.row][next.col] = ' ';
              stack.push(current);
              stack.push(next);
              visited.add(`${next.row},${next.col}`);
              path.push(next);
              if (next.row === this.finishPos.row && next.col === this.finishPos.col) {
                stack = []; // Stop the loop once the finish is reached
              }
              break;
            }
          }
        }
      }
  
      // Ensure the finish position is correctly set
      this.grid[this.finishPos.row][this.finishPos.col] = 'F';
  
      // Randomly shorten the path to the desired length
      const targetLength = Math.floor(Math.random() * 6) + 10; // Between 10 and 15
      if (path.length > targetLength) {
        let excess = path.length - targetLength;
        for (let i = 0; i < excess; i++) {
          let cell = path.pop();
          if (cell && this.grid[cell.row][cell.col] !== 'F' && this.grid[cell.row][cell.col] !== 'S') {
            this.grid[cell.row][cell.col] = 'O';
          }
        }
      }
  
      // Validate the generated maze
      isValidMaze = this.validatePath();
    }
  }
  
  // Shuffle the array of directions
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Check if a cell is valid for the path
  isValidPathCell(row: number, col: number, visited: Set<string>): boolean {
    return (
      row >= 0 &&
      row < this.gridSize &&
      col >= 0 &&
      col < this.gridSize &&
      !visited.has(`${row},${col}`) &&
      this.grid[row][col] === 'O'
    );
  }
  
  // Validate that there is a path from start to finish using BFS
  validatePath(): boolean {
    const queue = [{ row: this.characterPos.row, col: this.characterPos.col }];
    const visited = new Set<string>();
    visited.add(`${this.characterPos.row},${this.characterPos.col}`);
  
    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        const { row, col } = current;
        if (row === this.finishPos.row && col === this.finishPos.col) {
          return true; // Path to finish found
        }
  
        const directions = [
          { row: row + 1, col },
          { row: row - 1, col },
          { row, col: col + 1 },
          { row, col: col - 1 },
        ];
  
        for (const next of directions) {
          const key = `${next.row},${next.col}`;
          if (
            next.row >= 0 &&
            next.row < this.gridSize &&
            next.col >= 0 &&
            next.col < this.gridSize &&
            !visited.has(key) &&
            this.grid[next.row][next.col] !== 'O'
          ) {
            visited.add(key);
            queue.push(next);
          }
        }
      }
    }
    return false; // No path to finish
  }
  

  moveToCell(rowIndex: number, colIndex: number): void {
    if (this.grid[rowIndex][colIndex] !== 'O') {
      this.characterPos = { row: rowIndex, col: colIndex };
    }
  }

  getImageSource(row: number, col: number): string {
    if (row === this.characterPos.row && col === this.characterPos.col) {
      return 'assets/maze/character.jfif'; // Character image
    } else if (this.grid[row][col] === 'O') {
      return 'assets/maze/sand.jpg'; // Obstacle image
    } else if (this.grid[row][col] === 'F') {
      return 'assets/maze/finish.png'; // Finish image
    }
    return 'assets/maze/road.jfif'; // Path image

  }

  moveCharacter(direction: 'up' | 'down' | 'left' | 'right'): void {
    let newRow = this.characterPos.row + (direction === 'up' ? -1 : direction === 'down' ? 1 : 0);
    let newCol = this.characterPos.col + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0);

    // Check if the new position is within bounds and not an obstacle
    if (newRow >= 0 && newRow < this.gridSize && newCol >= 0 && newCol < this.gridSize && this.grid[newRow][newCol] !== 'O') {
      this.grid[this.characterPos.row][this.characterPos.col] = ' ';  // Mark previous position as path
      this.characterPos = { row: newRow, col: newCol };  // Update character position

      if (newRow === this.finishPos.row && newCol === this.finishPos.col) {
        this.grid[newRow][newCol] = 'F';  // Ensure the finish remains marked
        this.showCompletionAlert();      // Notify the user of completion
        this.resetMaze();                // Reset maze and character position
      } else {
        this.grid[newRow][newCol] = 'C'; // Mark character's new position
      }
    }
  }

  resetMaze(): void {
    this.characterPos = { row: 0, col: 0 };  // Reset character to start
    this.initializeGrid();                  // Reset grid
    this.generateMaze();                    // Generate a new maze
    this.grid[0][0] = 'C';                  // Place character at the start
  }

  async showCompletionAlert() {
    const alert = await this.alertController.create({
      header: 'Congratulations!',
      message: 'You reached the finish!',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
