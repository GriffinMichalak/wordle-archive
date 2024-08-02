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

  wordArr: string[]; 
  keyboard: string[][]; 
  guess: string[]; 
  pointer: number; 
  currentRow: number;
  correctTiles: number; 

  constructor() {

    this.keyboard = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ]

    this.guess = [];
    this.pointer = 0; 
    this.currentRow = 1; 
    this.correctTiles = 0; 

    this.wordArr = Array.from(this.WORD); 
    console.log("Answer:", this.wordArr);
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
    
    // console.log(this.guess, this.pointer);
  }
  
  enter() {
    console.log("YOU GUESSED: ", this.guess);
    let count = 0; 
    this.correctTiles = 0; 

    for (let i = this.pointer - 4; i <= this.pointer; i++) {
      let curr = this.guess[count]; 
      document.getElementById(`tile${i}`)!.style.color = 'white'; 

      // Green
      if (this.wordArr.includes(curr) && this.wordArr[count] === curr) {
        document.getElementById(`tile${i}`)!.style.backgroundColor = '#6aaa64'; 
        this.correctTiles++; 
      }

      // Yellow
      else if (this.wordArr.includes(curr)) {
        document.getElementById(`tile${i}`)!.style.backgroundColor = '#c9b458'; 
      }

      // Count
      else {
        document.getElementById(`tile${i}`)!.style.backgroundColor = '#787c7e'; 
      }

      count++; 
    }


    if (this.currentRow < 7) {
      this.currentRow++;
    }
    this.guess = []; 
  }

}
