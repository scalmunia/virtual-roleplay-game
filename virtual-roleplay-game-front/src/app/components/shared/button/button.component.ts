import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'vrg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent implements OnChanges {
  @Input() type: string = 'button';
  @Input() color: 'primary' | 'secondary' | 'danger' | null = null;
  @Input() variant: 'sghost' | 'dghost' | null = null;

  sideImageSrc: string = '';
  backgroundColor: string = '';

  ngOnChanges() {
    //El && evalua los términos uno a uno, y si todos los términos son 'truly' se queda con el último (un término 'falsy' sería, por ejermplo, '')
    this.sideImageSrc =
      (this.color === 'primary' && 'assets/images/pbutton_side.svg') ||
      (this.color === 'secondary' && 'assets/images/sbutton_side.svg') ||
      (this.color === 'danger' && 'assets/images/dbutton_side.svg') ||
      (this.variant === 'sghost' && 'assets/images/sgbutton_side.svg') ||
      (this.variant === 'dghost' && 'assets/images/dgbutton_side.svg') ||
      '';

    // const images = {
    //   primary: 'assets/images/pbutton_side.svg',
    //   secondary: 'assets/images/sbutton_side.svg'
    // }

    // this.sideImageSrc = images[this.color];
  }
}
