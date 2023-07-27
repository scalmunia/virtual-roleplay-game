import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
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
      name: new FormControl(''),
      characterClass: new FormControl(''),
      strength: new FormControl(''),
      dexterity: new FormControl(''),
      constitution: new FormControl(''),
      intelligence: new FormControl(''),
      wisdom: new FormControl(''),
      charisma: new FormControl(''),
    });

    //'merge' combina varias fuentes de observables en una sola secuencia de emisiones
    //te permite suscribirte una única vez para escuchar tanto los cambios en los parámetros de ruta como en los parámetros de consulta
    merge(
      this.route.queryParams,
      this.route.params
    ).pipe(
      map(() => this.loadCharacter())
    ).subscribe();

    // this.route.params.subscribe(params => {
    //   this.loadMode();
    // })
    // this.route.queryParams.subscribe(queryParams => {
    //   this.loadMode();
    // })
  }

  ngOnInit(): void {
    this.loadCharacter();
  }

  loadMode() {
    console.log('entrando en loadMode');
    this.id = this.route.snapshot.paramMap.get('id');
    const editModeQueryParam = this.route.snapshot.queryParamMap.has('edit');

    //Diferenciar las distintas rutas que tiene este componente
    const isCreate = !this.id; //Si no hay id
    const isView = this.id && !editModeQueryParam; //Si sí que hay id
    const isEdit = this.id && editModeQueryParam; //Si hay id y el query param 'edit'

    // if (isCreate) this.mode = 'create';
    // if (isView) this.mode = 'view';
    // if (isEdit) this.mode = 'edit';

    this.mode =
      (isCreate && 'create') ||
      (isEdit && 'edit') ||
      (isView && 'view') ||
      null;

    console.log('mode', this.mode);
  }

  onChangedEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  async onSubmit() {
    try {
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

      if (this.mode === 'create') {
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
            }
          }
        );
      }

      if (this.mode === 'edit') {
        console.log('entrando en edit');
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
            }
          },
          this.id as string
        );
      }

      this.router.navigate(['/character/' + this.id]);
    } catch (error) {
      console.error(error);
      this.error = error as Error;
    }
  }

  async loadCharacter() {
    this.loadMode();

    if (this.mode === 'view') {
      this.form.disable(); // Deshabilitar el formulario en modo 'view'
    } else {
      this.form.enable(); // Habilitar el formulario en modo 'create' o 'edit'
    }

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

  navigate() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        edit: 'true'
      }
    };
    this.router.navigate(['/character/' + this.id], navigationExtras);
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
