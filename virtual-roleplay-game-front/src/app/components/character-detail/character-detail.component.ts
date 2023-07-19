import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';
import { CharacterService } from 'src/app/services/character.service';
import { AbilityComponent } from 'src/app/components/character-detail/ability/ability.component';

@Component({
  selector: 'vrg-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  form: FormGroup;
  error: null | Error = null;
  htmlContent: any;
  modulesQuill = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  calcAbilityModifier = calcAbilityModifier;
  calcMaximunLife = calcMaximunLife;

  constructor(private characterService: CharacterService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      characterClass: new FormControl('', [Validators.required]),
      strength: new FormControl(''),
      dexterity: new FormControl(''),
      constitution: new FormControl(''),
      intelligence: new FormControl(''),
      wisdom: new FormControl(''),
      charisma: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  onChangedEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  async onSubmit() {
    try {
      const token = localStorage.getItem('token');
      const {
        name,
        characterClass,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      } = this.form.value;

      await this.characterService.create(
        {
          name: name,
          class: characterClass,
          abilities: {
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma,
          },
        },
        token as string
      );
    } catch (error) {
      console.error(error);
      this.error = error as Error;
    }
  }

  get strengthControl(): FormControl {
    return this.form.get('strength') as FormControl;
  }
  get dexterityControl(): FormControl {
    return this.form.get('dexterity') as FormControl;
  }
  get constitutionControl(): FormControl {
    return this.form.get('constitution') as FormControl;
  }
  get intelligenceControl(): FormControl {
    return this.form.get('intelligence') as FormControl;
  }
  get wisdomControl(): FormControl {
    return this.form.get('wisdom') as FormControl;
  }
  get charismaControl(): FormControl {
    return this.form.get('charisma') as FormControl;
  }
}
