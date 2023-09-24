import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Abilities, ICharacter } from 'src/app/models/Character/Character';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';

@Component({
  selector: 'vrg-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})

export class AbilityComponent implements OnChanges {
  @Input() ability: keyof Abilities | null = null;
  @Input() form!: FormGroup;
  @Input() control: FormControl = new FormControl();
  @Input() disabled: boolean = false;
  @Input() character: ICharacter | null = null;;

  // calcAbilityModifier = calcAbilityModifier;

  // Almacena el modificador calculado
  modifier: number = 0;

  ngOnChanges() {
    // Depuración: verifica que this.character y this.ability estén configurados correctamente
    // console.log('Character----:', this.character);
    // console.log('Ability-----:', this.ability);

    // Calcular el modificador una vez y almacenarlo en la variable modifier
    if (this.character && this.ability) {
      this.modifier = calcAbilityModifier(this.character, this.ability);
    }
  }

  text(ability: keyof Abilities) {
    // console.log('Character----222222222:', this.character);
    const texts = {
      strength: 'FUERZA',
      dexterity: 'DESTREZA',
      constitution: 'CONSTITUCIÓN',
      intelligence: 'INTELECTO',
      wisdom: 'SABIDURÍA',
      charisma: 'CARISMA'
    }

    return texts[ability] || 'undefined';
  }
}
