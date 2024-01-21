import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentDialogResult, EquipmentModalComponent } from './equipment-modal/equipment-modal.component';
import { Attack, Equipment, ICharacter } from 'src/app/models/Character/Character';
import { SKILLS_LIST } from 'src/app/models/Character/character.constants';
import { DiceComponent } from '../shared/dice/dice.component';

const skillsEntries = SKILLS_LIST.map((skill) => ([skill.id, new FormControl(false)]));
const skillControls = Object.fromEntries(skillsEntries);

@Component({
  selector: 'vrg-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})

export class CharacterDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id: string | null = null;
  mode: 'create' | 'edit' | 'view' | null = null;
  levelOptions: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
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
  isModalOpen = false;
  attacks: Attack[] = [];
  equipment: Equipment[] = [];
  error: null | Error = null;
  @ViewChild(DiceComponent) dice!: DiceComponent; // ViewChild para el componente vrg-dice

  get character(): ICharacter {
    return {
      ...this.form.value,
      abilities: {
        strength: this.form.get('strength')?.value,
        dexterity: this.form.get('dexterity')?.value,
        constitution: this.form.get('constitution')?.value,
        intelligence: this.form.get('intelligence')?.value,
        wisdom: this.form.get('wisdom')?.value,
        charisma: this.form.get('charisma')?.value,
      },
      attacks: this.attacks,
      equipment: this.equipment
    }
  }

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = new FormGroup({
      avatar: new FormControl(''),
      name: new FormControl(''),
      level: new FormControl(1),
      characterClass: new FormControl(''),
      strength: new FormControl(''),
      dexterity: new FormControl(''),
      constitution: new FormControl(''),
      intelligence: new FormControl(''),
      wisdom: new FormControl(''),
      charisma: new FormControl(''),
      description: new FormControl(''),
      skills: new FormGroup(skillControls),
    });

    //'combineLatest' combina varias fuentes de observables en una sola secuencia de emisiones
    //te permite suscribirte una única vez para escuchar tanto los cambios en los parámetros de ruta como en los parámetros de consulta
    //https://gist.github.com/PCreations/99765f48b1f60c9427c479c25f3e3bbd
    combineLatest([this.route.queryParams, this.route.params]).subscribe(() => {
      this.loadMode();
    });
  }

  ngOnInit(): void {
    this.resetSkills();

    if (this.mode === 'edit' || this.mode === 'view') {
      this.setFormWhenCharacterLoadedSubscription();
      this.characterService.loadCharacter(this.id as string);
    };
  }

  ngOnDestroy(): void {
    this.characterService.unload();
  }

  setFormWhenCharacterLoadedSubscription() {
    this.characterService.character$.subscribe(character => {
      if (!character) return;
      this.loadCharacterFormValues(character)
    })
  }

  private resetSkills() {
    const skillsFormGroup = this.form.get('skills') as FormGroup;
    Object.keys(skillsFormGroup.controls).forEach((skillId) => {
      const control = skillsFormGroup.get(skillId) as FormControl;
      control.setValue(false);
    });
  }

  loadMode() {
    this.id = this.route.snapshot.paramMap.get('id');
    const editModeQueryParam = this.route.snapshot.queryParamMap.has('edit');

    //Diferenciar las distintas rutas que tiene este componente
    const isCreate = !this.id; //Si no hay id
    const isView = this.id && !editModeQueryParam; //Si sí que hay id
    const isEdit = this.id && editModeQueryParam; //Si hay id y el query param 'edit'

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

  async loadCharacterFormValues(character: ICharacter) {
    //Cargar los valores en el formulario
    this.form.controls['avatar'].setValue(character.avatar);
    this.form.controls['name'].setValue(character.name);
    this.form.controls['level'].setValue(character.level);
    this.form.controls['characterClass'].setValue(character.class);
    this.form.controls['strength'].setValue(character.abilities.strength);
    this.form.controls['dexterity'].setValue(
      character.abilities.dexterity
    );
    this.form.controls['constitution'].setValue(
      character.abilities.constitution
    );
    this.form.controls['intelligence'].setValue(
      character.abilities.intelligence
    );
    this.form.controls['wisdom'].setValue(character.abilities.wisdom);
    this.form.controls['charisma'].setValue(character.abilities.charisma);
    this.form.controls['skills'].setValue(character.skills);
    this.form.controls['description'].setValue(character.description);

    this.attacks = character.attacks;
    this.equipment = character.equipment;
  }

  async onSubmit() {
    try {
      const {
        avatar,
        name,
        level,
        characterClass,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        skills,
        description
      } = this.form.value;

      await this.characterService.save({
        avatar: avatar,
        name: name,
        level: level,
        class: characterClass,
        abilities: {
          strength: strength,
          dexterity: dexterity,
          constitution: constitution,
          intelligence: intelligence,
          wisdom: wisdom,
          charisma: charisma
        },
        skills: skills,
        attacks: this.attacks,
        description: description,
        equipment: this.equipment
      }, this.id as string | undefined);

      if (this.mode === 'create') {
        this.router.navigate(['/characters/']);
      }

      if (this.mode === 'edit') {
        this.router.navigate(['/character/' + this.id]);
      }

    } catch (error) {
      console.error(error);
      this.error = error as Error;
    }
  }

  async deleteCharacter() {
    const isConfirmed = window.confirm(
      '¿Estás seguro de que quieres borrar el personaje?'
    );
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
        edit: 'true',
      },
    };
    this.router.navigate(['/character/' + this.id], navigationExtras);
  }

  onChangedEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
      this.form.controls['description'].setValue(this.htmlContent);
    }
  }

  openDialog(item?: Equipment) {
    if (this.mode === 'view') return;

    this.isModalOpen = true;

    const dialogRef = this.dialog.open(EquipmentModalComponent, {
      maxWidth: '780px',
      width: '100%',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: EquipmentDialogResult) => {
      this.isModalOpen = false;

      if (result.operation === 'cancel') return;

      const alreadyExists = this.equipment.some(item => item.id === result.item?.id);

      if (result.operation === 'delete') {
        this.equipment = this.equipment.filter(item => item.id !== result.item?.id);

        return;
      }

      if (result.operation === 'save' && alreadyExists) {
        this.equipment = this.equipment.map(item => {
          if (item.id === result.item?.id) return result.item;

          return item;
        });

        return;
      }

      if (result.operation === 'save' && !alreadyExists && result.item) {
        this.equipment.push(result.item);

        return;
      }
    });
  }

  convertQualityToColor(quality: string): 'grey' | 'blue' | 'yellow' {
    switch (quality) {
      case 'common':
        return 'grey';
      case 'rare':
        return 'blue';
      case 'legendary':
        return 'yellow';
      default:
        return 'grey';
    }
  }

  updateImage(url: any) {
    this.form.controls['avatar'].setValue(url)
  }

  updateAttacks(attacks: Attack[]) {
    this.attacks = attacks;
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

  get skillsControls() {
    const entries = Object.entries((this.form.get('skills') as FormGroup).controls) as Array<[string, FormControl<boolean>]>;
    const obj = entries.map(([skillId, control]) => ({ skillId, control }))
    return obj;
  }
}
