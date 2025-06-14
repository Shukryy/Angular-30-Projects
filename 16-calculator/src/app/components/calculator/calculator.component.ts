import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, DisplayComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  operators: string[] = ['+', '-', '*', '/'];
  buttonLayout: string[][] = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '*'],
    ['C', '0', '=', '/'],
  ];

  constructor(private calculatorService: CalculatorService) {}

  handleInput(input: string): void {
    this.calculatorService.handleInput(input);
  }

  get display(): string {
    return this.calculatorService.getDisplay();
  }
}
