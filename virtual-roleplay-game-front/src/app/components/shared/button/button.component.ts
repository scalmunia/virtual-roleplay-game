import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'vrg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent implements OnChanges {
  @Input() type: string = 'button';
  @Input() color: 'primary' | 'secondary' | 'terciary' = 'primary';

  sideImageSrc: string = '';
  backgroundColor: string = '';

  ngOnChanges() {
    //El && evalua los términos uno a uno, y si todos los términos son 'truly' se queda con el último (un término 'falsy' sería, por ejermplo, '')
    this.sideImageSrc =
      (this.color === 'primary' && 'assets/images/pbutton_side.svg') ||
      (this.color === 'secondary' && 'assets/images/sbutton_side.svg') ||
      (this.color === 'terciary' && 'assets/images/tbutton_side.svg') ||
      '';

    // const images = {
    //   primary: 'assets/images/pbutton_side.svg',
    //   secondary: 'assets/images/sbutton_side.svg'
    // }

    // this.sideImageSrc = images[this.color];
  }
}
