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
    let min = (this.currentRow - 1) * 5;
    let max = this.currentRow * 5; 
    if (key != 'enter' && key != 'delete' && this.guess.length < max) {
      this.guess.push(key); 
      if (this.pointer < max) {
        this.pointer++; 
      }
      document.getElementById(`tile${this.pointer}`)!.innerHTML = this.guess[this.guess.length-1]; 
    }
    else if (key == 'delete') {
      this.guess.pop();
      if (this.pointer > min) {
        document.getElementById(`tile${this.pointer}`)!.innerHTML = ''; 
        this.pointer--; 
      }
    }
    else if (key == 'enter') {
      if (this.guess.length === max) {
        this.enter(); 
      }
      return; 
    }
    console.log(this.guess, this.pointer);
  }

  enter() {
    console.log("ENTER: ", this.guess);
    this.guess = []; 
    this.currentRow++;
  }

}
