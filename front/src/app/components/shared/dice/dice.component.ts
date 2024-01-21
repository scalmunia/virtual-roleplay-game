import { Component } from '@angular/core';
import random from 'random';

const diceRollAudio = new Audio('assets/audio/roll-dice.mp3')

@Component({
  selector: 'vrg-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})

export class DiceComponent {
  rolling: boolean = false;
  result: { roll: number, bonus: number, total: number } | null = null;

  public async roll(dice: 'D20', bonus: number) {
    this.rolling = true;

    await new Promise(resolve => setTimeout(resolve, 500));
    setTimeout(() => diceRollAudio.play(), 200);

    const randomUniformNumber = random.uniform(0, 1);
    const randomNumber = randomUniformNumber();
    const roll = Math.ceil(randomNumber * 20);

    this.rolling = false;
    this.result = {
      roll,
      bonus,
      total: roll + bonus
    }
  }

  getAbs(number: number) {
    return Math.abs(number);
  }

  getSign(number?: number | null) {
    if (number === undefined || number === null) return '';
    return number >= 0 ? '+' : '-';
  }
}