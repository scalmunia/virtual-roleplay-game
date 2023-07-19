import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';

@Component({
  selector: 'vrg-hit-points',
  templateUrl: './hit-points.component.html',
  styleUrls: ['./hit-points.component.css']
})
export class HitPointsComponent {
  @Input() form!: FormGroup;
  calcMaximunLife = calcMaximunLife;
}
