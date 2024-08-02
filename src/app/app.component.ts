import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import internal from 'node:stream';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wordle';
  WORD: string = 'FLAKE';

  keyboard: string[][]; 
  guess: string[]; 
  pointer: number; 
  currentRow: number;

  constructor() {

    this.keyboard = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ]

    this.guess = [];
    this.pointer = 0; 
    this.currentRow = 1; 
  }

  click(key: string): void {
    let min = 5 * this.currentRow - 5;
    let max = 5 * this.currentRow; 
    
    // 1. Enter
    if (key === 'enter') {
      if (this.pointer === max) {
        this.enter(); 
      }
    }
    // 2. Delete
    else if (key === 'delete') {
      if (this.pointer > min) {
        document.getElementById(`tile${this.pointer}`)!.innerHTML = '';
        this.pointer--; 
        this.guess.pop(); 
      }
    }
    // 3. Any other letter
    else {
      if (this.pointer < max) {
        this.pointer++;
        this.guess.push(key); 
        document.getElementById(`tile${this.pointer}`)!.innerHTML = this.guess[this.guess.length - 1];
      }
    }
    
    console.log(this.guess, this.pointer);
  }
  
  enter() {
    console.log("YOU GUESSED: ", this.guess);
    if (this.currentRow < 6) {
      this.currentRow++;
    }
    else {
      alert("you lose!");
      location.reload();
    }
    this.guess = []; 
  }

}
