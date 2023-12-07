import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Attack, ICharacter } from 'src/app/models/Character/Character';
import { ABILITY_SCORES_AND_MODIFIERS, PROFICIENCY_BONUS_ACORDING_TO_LEVEL, SKILLS_LIST } from 'src/app/models/Character/character.constants';

@Component({
  selector: 'vrg-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit, OnChanges {
  @Input() character: ICharacter | null = null;
  @Output() onAttacksChange: EventEmitter<Attack[]> = new EventEmitter()

  form = new FormGroup({
    attacks: new FormArray([] as FormGroup[]),
  })

  get attacks() {
    return this.form.get('attacks') as FormArray;
  }

  ngOnInit() {
    // Modo edición o creación
    // this.addAttack()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentCharacter: ICharacter = changes['character'].currentValue;
    const prevCharacter: ICharacter = changes['character'].previousValue;
    const hasAttacks = currentCharacter.attacks.length > 0;
    const attacksChanged = JSON.stringify(prevCharacter?.attacks) !== JSON.stringify(currentCharacter?.attacks);

    if (hasAttacks && attacksChanged) {
      this.loadAttacks()
    }
  }

  loadAttacks() {
    if (!this.character) return;
    // this.form.setValue({ attacks: this.character.attacks })
    this.form.get('attacks')?.setValue([]);

    this.character.attacks.forEach(attack => {
      this.addAttack(attack)
    });

    this.addAttack();
    console.log('loadAttacks', this.form.getRawValue(), this.character)
  }

  addAttack(attack?: Attack) {
    this.form.controls.attacks.push(
      new FormGroup({
        proficiency: new FormControl(attack?.proficiency || false),
        name: new FormControl(attack?.name || ''),
        ability: new FormControl(attack?.ability || ''),
        damage: new FormControl(attack?.damage || ''),
      })
    )
  }

  addNewAttack() {
    this.addAttack();

    const attacks = this.form.get('attacks')?.value as Attack[];
    this.onAttacksChange.emit(attacks)
  }
}
