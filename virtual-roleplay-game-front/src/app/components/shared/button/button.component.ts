import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'vrg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnChanges {
  @Input() type: string = '';
  @Input() color: string = '';

  sideImageSrc: string = '';

  ngOnChanges() {
    this.sideImageSrc = this.color === 'primary' ? 'assets/images/pbutton_side.svg' : 'assets/images/sbutton_side.svg';
  }

  get colorClass(): string {
    return this.color === 'primary' ? 'button-primary' : 'button-secondary';
  }
}
