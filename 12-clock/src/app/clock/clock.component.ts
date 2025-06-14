import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CLOCK_CONSTANTS as cc } from './clock.constants';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-clock',
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent implements OnInit {
  // Rotation angles
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  clockNumbers = this.generateClockNumbers();

  generateClockNumbers() {
    const numbers = [];
    const centerOffset = cc.CENTER_OFFSET;
    const radius = cc.RADIUS;

    // Loop through the numbers 1 to 12 to calculate their positions
    for (let n = 1; n <= 12; n++) {
      const angle = (n - 3) * cc.DEGREES_PER_HOUR * cc.DEG_TO_RAD;
      const top = centerOffset + radius * Math.sin(angle);
      const left = centerOffset + radius * Math.cos(angle);

      //  Add numbers to the array
      numbers.push({
        number: n,
        position: {
          top: `${top}%`,
          left: `${left}%`,
        },
      });
    }
    return numbers;
  }

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  // update hands of our clock
  updateClock() {
    const now = this.timeService.getCurrentTime();
    this.hours =
      (now.getHours() % 12) * cc.DEGREES_PER_HOUR +
      now.getMinutes() * cc.MINUTE_ADJUSTMENT +
      cc.OFFSET_ROTATION;
    this.minutes =
      now.getMinutes() * cc.DEGREES_PER_MINUTE_SECOND +
      now.getSeconds() * cc.SECOND_ADJUSTMENT +
      cc.OFFSET_ROTATION;
    this.seconds =
      now.getSeconds() * cc.DEGREES_PER_MINUTE_SECOND + cc.OFFSET_ROTATION;
  }
}
