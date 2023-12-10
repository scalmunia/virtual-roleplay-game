import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Abilities, Attack, ICharacter } from 'src/app/models/Character/Character';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';
import { ABILITY_SCORES_AND_MODIFIERS, PROFICIENCY_BONUS_ACORDING_TO_LEVEL, SKILLS_LIST } from 'src/app/models/Character/character.constants';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'vrg-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit, OnChanges {
  @Input() mode: 'edit' | 'view' | 'create' | null = null;
  character: ICharacter | null = null;
  @Output() onAttacksChange: EventEmitter<Attack[]> = new EventEmitter()
  @Output() onBonusClick: EventEmitter<number> = new EventEmitter();

  form = new FormGroup({
    attacks: new FormArray([] as FormGroup[]),
  })

  get attacks() {
    return this.form.get('attacks') as FormArray;
  }

  constructor(private characterService: CharacterService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadFormWhenCharagerloadedSubscription();
    this.updateCharacterWhenAttackFormChangesSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      if (changes['mode'].currentValue === 'view') this.form.disable();
      else this.form.enable();
    }
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

    if (this.mode === 'view') {
      this.form.disable();
    }
  };

  calcAttackBonus(attack: AbstractControl<any, any>): number {
    if (!this.character) return 0;

    const ability = attack.get('ability')?.value;
    const abilityBonus = calcAbilityModifier(this.character, ability as keyof Abilities);

    const hasProficiency = attack.get('proficiency')?.value;
    const proficiencyBonus = PROFICIENCY_BONUS_ACORDING_TO_LEVEL[this.character?.level];

    return hasProficiency ? abilityBonus + proficiencyBonus : abilityBonus;
  };

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

  removeAttack(attack: number) {
    this.attacks.removeAt(attack);
  }

  addNewAttack() {
    this.addAttack();

    const attacks = this.form.get('attacks')?.value as Attack[];
  }
}
