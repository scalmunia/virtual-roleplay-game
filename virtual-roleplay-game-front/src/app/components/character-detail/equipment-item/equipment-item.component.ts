import { Component, Input } from '@angular/core';

@Component({
  selector: 'vrg-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.css']
})

export class EquipmentItemComponent {
  @Input() src: string = '';
  @Input() name: string = '';
  @Input() statistics: { bonus?: number, name: string, effect?: string }[] | null = null;
  @Input() description: string = '';
  @Input() color: 'grey' | 'blue' | 'yellow' = 'grey';

}
