import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Attack, ICharacter } from 'src/app/models/Character/Character';
import { ABILITY_SCORES_AND_MODIFIERS, PROFICIENCY_BONUS_ACORDING_TO_LEVEL, SKILLS_LIST } from 'src/app/models/Character/character.constants';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'vrg-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {
  character: ICharacter | null = null;
  @Output() onAttacksChange: EventEmitter<Attack[]> = new EventEmitter()

  form = new FormGroup({
    attacks: new FormArray([] as FormGroup[]),
  })

  get attacks() {
    return this.form.get('attacks') as FormArray;
  }

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.loadFormWhenCharagerloadedSubscription();
    this.updateCharacterWhenAttackFormChangesSubscription();
  }

  loadFormWhenCharagerloadedSubscription() {
    this.characterService.character$.subscribe((character) => {
      if (!character) return;
      this.loadForm(character?.attacks);
      this.character = character;
    })
  }

  updateCharacterWhenAttackFormChangesSubscription() {
    this.form.valueChanges.subscribe(form => {
      const attacks = form.attacks?.filter(attack => attack.name)
      console.log({ attacks })
      this.onAttacksChange.emit(attacks);
    })
  }

  loadForm(attacks?: ICharacter['attacks']) {
    if (!attacks) return;
    this.form.get('attacks')?.setValue([]);

    attacks.forEach(attack => {
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

  removeAttack(attack: Attack) {
    console.log(`TODO: eliminar ${attack.name}`)
  }

  addNewAttack() {
    this.addAttack();

    const attacks = this.form.get('attacks')?.value as Attack[];
  }
}
