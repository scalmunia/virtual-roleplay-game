import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Attribute {
  attribute: string;
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
  attributes: FormArray;
  error: Error | null = null;

  constructor(
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EquipmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // this.form = new FormGroup({
    //   name: new FormControl([data.form ? data.form.name : '', Validators.maxLength(40)]),
    //   quality: new FormControl([data && data.form ? data.form.quality : '']),
    //   description: new FormControl([data && data.form ? data.form.description : '', [Validators.maxLength(256)]])
    // });

    // if (data !== undefined) {
    //   this.setProperties(data);
    // }

    this.form = new FormGroup({
      name: new FormControl('', [Validators.maxLength(40)]),
      quality: new FormControl(''),
      description: new FormControl('', [Validators.maxLength(256)])
    });

    this.attributes = new FormArray([
      new FormGroup({
        attribute: new FormControl(''),
        bonus: new FormControl(''),
        effect: new FormControl(''),
        isAdded: new FormControl(false)
      })
    ]);

  }

  ngOnInit(): void {
    this.setProperties(this.data);
  }

  setProperties(data: any) {
    this.form.controls['name'].patchValue(this.data.name || '')
    console.log('setProperties', this.form)


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
        attribute: new FormControl(''),
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
    const filteredAttributes = this.attributes.value.filter((attribute: Attribute) => attribute.isAdded);

    const result = {
      ...this.form.value,
      attributes: filteredAttributes
    };

    this.dialogRef.close(result);
  }
}
