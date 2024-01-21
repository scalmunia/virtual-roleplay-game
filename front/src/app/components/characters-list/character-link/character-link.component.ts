import { Component, Input } from '@angular/core';
import { CLASSES_TRANSLATION } from 'src/app/models/Character/character.constants';

@Component({
  selector: 'vrg-character-link',
  templateUrl: './character-link.component.html',
  styleUrls: ['./character-link.component.css']
})

export class CharacterLinkComponent {
  @Input() routerLink: string = '';
  @Input() borderColor: 'characterLink' | 'newCharacterLink' = 'characterLink';
  @Input() src: string | null = null;
  @Input() srcLeft: string = '';
  @Input() name: string | null = null;
  @Input() level: number | null = null;
  @Input() characterClass: string | null = null;
  @Input() srcRight: string = '';

  getClassTranslation(characterClass: string | null): string {
    if (characterClass === null) {
      return '';
    }
    return CLASSES_TRANSLATION[characterClass as keyof typeof CLASSES_TRANSLATION] || characterClass;
  }
}
