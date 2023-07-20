import { Component, Input } from '@angular/core';

@Component({
  selector: 'vrg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: string = '';
}
