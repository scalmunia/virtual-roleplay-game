import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
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
      avatar: new FormControl(''),
      name: new FormControl(''),
      characterClass: new FormControl(''),
      strength: new FormControl(''),
      dexterity: new FormControl(''),
      constitution: new FormControl(''),
      intelligence: new FormControl(''),
      wisdom: new FormControl(''),
      charisma: new FormControl(''),
    });

    //'combineLatest' combina varias fuentes de observables en una sola secuencia de emisiones
    //te permite suscribirte una única vez para escuchar tanto los cambios en los parámetros de ruta como en los parámetros de consulta
    //https://gist.github.com/PCreations/99765f48b1f60c9427c479c25f3e3bbd
    combineLatest([
      this.route.queryParams,
      this.route.params
    ]).subscribe(() => {
      this.loadMode();
    });
  }

  ngOnInit(): void {
    if (this.mode === 'create') return;

    this.loadCharacter();
  }

  loadMode() {
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

    if (this.mode === 'view') {
      this.form.disable(); // Deshabilitar el formulario en modo 'view'
    } else {
      this.form.enable(); // Habilitar el formulario en modo 'create' o 'edit'
    }
  }

  async loadCharacter() {
    const response = await this.characterService.getOne(this.id as string);

    //Cargar los valores en el formulario
    this.form.controls['avatar'].setValue(response.result.avatar);
    this.form.controls['name'].setValue(response.result.name);
    this.form.controls['characterClass'].setValue(response.result.class);
    this.form.controls['strength'].setValue(response.result.abilities.strength);
    this.form.controls['dexterity'].setValue(response.result.abilities.dexterity);
    this.form.controls['constitution'].setValue(response.result.abilities.constitution);
    this.form.controls['intelligence'].setValue(response.result.abilities.intelligence);
    this.form.controls['wisdom'].setValue(response.result.abilities.wisdom);
    this.form.controls['charisma'].setValue(response.result.abilities.charisma);
  }

  async onSubmit() {
    try {
      const {
        avatar,
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
            avatar: avatar,
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
        this.router.navigate(['/characters/']);
      }

      if (this.mode === 'edit') {
        await this.characterService.save(
          {
            avatar: avatar,
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
        this.router.navigate(['/character/' + this.id]);
      }
    } catch (error) {
      console.error(error);
      this.error = error as Error;
    }
  }

  async deleteCharacter() {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres borrar el personaje?');
    if (isConfirmed) {
      try {
        await this.characterService.deleteOne(this.id as string);
        this.router.navigate(['/characters']);
      } catch (error) {
        console.error(error);
        this.error = error as Error;
      }
    }
  }

  navigate() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        edit: 'true'
      }
    };
    this.router.navigate(['/character/' + this.id], navigationExtras);
  }

  onChangedEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
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
