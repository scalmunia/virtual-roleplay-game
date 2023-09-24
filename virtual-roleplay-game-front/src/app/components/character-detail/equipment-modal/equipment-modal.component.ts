import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AssetsService } from 'src/app/services/assets.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipment } from 'src/app/models/Character/Character';
import { v4 as uuid } from 'uuid';

interface Attribute {
  name: string;
  bonus: any;
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
  img: string = '';

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
      img: new FormControl(''),
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
      console.log('data modal', this.data)
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
      console.log('modal attributesFormArray', attributesFormArray)

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
    console.log('attribute antes añadir', this.attributes)

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

    console.log('attributs despues push', this.attributes)

    // Workaround (en cristiano, ñapa): Fuerza la detección de cambios de angular una vez se ha limpiado la pila de llamadas
    setTimeout(() => this.cd.detectChanges());
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }

  onSubmit() {

    console.log('modal attributes', this.attributes.value)
    const filteredAttributes = this.attributes.value.filter((attribute: Attribute) => attribute.isAdded);
    console.log('modal filteredAttributes', filteredAttributes)

    const result = {
      ...this.form.value,
      attributes: filteredAttributes
    };

    console.log('modal result', result)

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

  async uploadFiles(e: any) {
    try {
      const response = await this.assetsService.uploadFiles(e.target.files[0]);
      this.img = response.result;
      console.log('imagen', this.img);
    } catch (error) {
      this.error = error as Error;
    }
  }
}

export interface EquipmentDialogResult {
  operation: 'save' | 'delete' | 'cancel';
  item?: Equipment;
}
