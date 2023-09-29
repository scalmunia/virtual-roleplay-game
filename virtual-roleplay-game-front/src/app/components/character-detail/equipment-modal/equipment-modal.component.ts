import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AssetsService } from 'src/app/services/assets.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipment, ICharacter } from 'src/app/models/Character/Character';
import { v4 as uuid } from 'uuid';

interface Attribute {
  name: string;
  bonus: number;
  effect: string;
  isAdded: boolean;
}

@Component({
  selector: 'vrg-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.css'],
})

export class EquipmentModalComponent implements OnInit {
  form: FormGroup;
  error: Error | null = null;
  loadingImage = false;

  constructor(
    private assetsService: AssetsService,
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EquipmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Equipment
  ) {
    this.form = new FormGroup({
      id: new FormControl(uuid(), [Validators.required]),
      name: new FormControl('', [Validators.maxLength(40)]),
      quality: new FormControl(''),
      description: new FormControl('', [Validators.maxLength(256)]),
      img: new FormControl(''), // url
      attributes: new FormArray([
        new FormGroup({
          name: new FormControl(''),
          bonus: new FormControl(''),
          effect: new FormControl(''),
          isAdded: new FormControl(false)
        })
      ])
    })
  }

  get attributes() {
    return this.form.controls["attributes"] as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    if (this.data) {
      this.setProperties(this.data);
    }
  }

  setProperties(data: Equipment) {
    this.form.controls['id'].patchValue(data.id);
    this.form.controls['name'].patchValue(data.name);
    this.form.controls['quality'].patchValue(data.quality);
    this.form.controls['description'].patchValue(data.description);
    this.form.controls['img'].patchValue(data.img);

    if (data.attributes) {
      const attributesFormArray = this.form.controls['attributes'] as FormArray;

      while (attributesFormArray.length < data.attributes.length) {
        this.addAttribute(); //Añadir un nuevo FormGroup si se necesita
      }

      attributesFormArray.patchValue(data.attributes);
    }

    // Workaround (en cristiano, ñapa): Fuerza la detección de cambios de angular una vez se ha limpiado la pila de llamadas
    setTimeout(() => this.cd.detectChanges());
  }

  addAttribute() {
    const previousIndex = this.attributes.length - 1;

    // Actualizar el estado isAdded para la fila anterior
    if (previousIndex >= 0) {
      const previousAttribute = this.attributes.at(previousIndex);
      previousAttribute.get('isAdded')?.setValue(true);
    }


    // Agregar una nueva fila de atributos
    this.attributes.push(
      new FormGroup({
        name: new FormControl(''),
        bonus: new FormControl(''),
        effect: new FormControl(''),
        isAdded: new FormControl(false)
      })
    );

    // Workaround (en cristiano, ñapa): Fuerza la detección de cambios de angular una vez se ha limpiado la pila de llamadas
    setTimeout(() => this.cd.detectChanges());
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }

  onSubmit() {
    const filteredAttributes: Attribute[] = this.attributes.value
      .map(data => ({ ...data, bonus: isNaN(parseInt(data.bonus)) ? 0 : parseInt(data.bonus) }))
      .filter((attribute: Attribute) => attribute.isAdded)

    const result: Equipment = {
      ...this.form.value,
      attributes: filteredAttributes
    };


    this.dialogRef.close({ operation: 'save', item: result });
  }

  deleteItem() {
    const isConfirmed = window.confirm(
      '¿Estás seguro de que quieres borrar esta pieza del equipo?'
    );

    if (isConfirmed) {
      this.dialogRef.close({ operation: 'delete', item: this.data });
    }
  }

  closeModal() {
    this.dialogRef.close({ operation: 'cancel' });
  }

  async updateImageUrl(e: any) {
    this.loadingImage = true;
    try {
      const rawFile: File = e.target.files[0];

      const blob = rawFile.slice(0, rawFile.size, rawFile.type);
      const timestamp = new Date().getTime();
      const file = new File([blob], `${rawFile.name}-${timestamp}`, { type: rawFile.type });

      const response = await this.assetsService.uploadFiles(file);
      const url = response.result;

      this.form.controls['img'].setValue(url);
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.loadingImage = false;
    }
  }

  handleError() {
    this.form.controls['img'].setValue('');
  }
}


export interface EquipmentDialogResult {
  operation: 'save' | 'delete' | 'cancel';
  item?: Equipment;
}