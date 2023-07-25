import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'vrg-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  form: FormGroup;
  id: string | null = null;
  mode: 'create' | 'edit' | 'view' | null = null;
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

  constructor(private characterService: CharacterService, private route: ActivatedRoute, private router: Router) {
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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    //Diferenciar las distintas rutas que tiene este componente
    const isCreate = !this.id; //Si no hay id
    const isView = this.id; //Si sí que hay id
    const isEdit = isView && this.route.snapshot.queryParamMap.has('edit'); //Si hay id y el query param 'edit'

    // if (isCreate) this.mode === 'create';
    // if (isView) this.mode === 'view';
    // if (isEdit) this.mode === 'edit';

    this.mode =
      (isCreate && 'create') ||
      (isView && 'view') ||
      (isEdit && 'edit') ||
      null;

    console.log('mode', this.mode);

    if (this.mode = 'view') {
      this.loadCharacter();
    }
  }

  onChangedEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  async onSubmit() {
    try {
      if (this.mode = 'create') {
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

        await this.characterService.save(
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
        );
      }

      if (this.mode = 'edit') { }

      this.router.navigate(['/characters']);
    } catch (error) {
      console.error(error);
      this.error = error as Error;
    }
  }

  async loadCharacter() {
    const response = await this.characterService.getOne(this.id as string);
    console.log('response', response);
    //Cargar los valores en el formulario
    this.form.controls['name'].setValue(response.result.name);
    this.form.controls['characterClass'].setValue(response.result.class);
    this.form.controls['strength'].setValue(response.result.abilities.strength);
    this.form.controls['dexterity'].setValue(response.result.abilities.dexterity);
    this.form.controls['constitution'].setValue(response.result.abilities.constitution);
    this.form.controls['intelligence'].setValue(response.result.abilities.intelligence);
    this.form.controls['wisdom'].setValue(response.result.abilities.wisdom);
    this.form.controls['charisma'].setValue(response.result.abilities.charisma);
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
