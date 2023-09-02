import { Component, Input } from '@angular/core';
import { Equipment } from 'src/app/models/Character/Character';
import { ABILITIES_TRANSLATION } from 'src/app/models/Character/character.constants';

@Component({
  selector: 'vrg-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.css']
})

export class EquipmentItemComponent {
  @Input() src: string = '';
  @Input() name: string = '';
  @Input() attributes: Equipment['attributes'] | null = null;
  @Input() description: string = '';
  @Input() color: 'grey' | 'blue' | 'yellow' = 'grey';

  translateAttribute(attribute: string): string {
    return ABILITIES_TRANSLATION[attribute] || attribute;
  }
}
