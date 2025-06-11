import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  choices = ['Rock', 'Paper', 'Scissors'];
  playerChoice: string | null = null;
  computerChoice: string | null = null;
  result: string | null = null;

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  determineWinner(player: string, computer: string): string {
    if (player === computer) return "It's a tie!";
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'You win!';
    }
    return 'You lose!';
  }

  play(choice: string) {
    this.playerChoice = choice;
    this.computerChoice =
      this.choices[this.getRandomNumber(this.choices.length)];
    this.result = this.determineWinner(this.playerChoice, this.computerChoice);
  }
}
