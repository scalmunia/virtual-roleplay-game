import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'vrg-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})
export class AbilityComponent {
  @Input() ability: string = '';
  @Input() modifier: any;
  @Input() control: FormControl = new FormControl();
}
