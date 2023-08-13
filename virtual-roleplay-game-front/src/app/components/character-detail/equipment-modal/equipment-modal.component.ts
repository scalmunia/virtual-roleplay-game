import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<EquipmentModalComponent>
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.maxLength(40)]),
      quality: new FormControl(''),
      description: new FormControl('', [Validators.maxLength(256)]),
    });

    const emptyAttribute = this.createAttributeForm();
    this.attributes = new FormArray([emptyAttribute]);
    // this.attributes = new FormArray([] as any[]);
  }

  ngOnInit(): void {}

  onSubmit() {
    // Cambiar la clase del contenedor según la calidad seleccionada
    const qualityValue = this.form.controls['quality'].value;

    const result = {
      // etc
    };

    console.log('attributes.value', this.attributes.value);

    this.dialogRef.close(result);
  }

  addAttribute() {
    const emptyAttribute = this.createAttributeForm();
    this.attributes.push(emptyAttribute);

    // Workaround (en cristiano, ñapa): Fuerza la detección de cambios de angular una vez se ha limpiado la pila de llamadas
    setTimeout(() => this.cd.detectChanges());
  }

  private createAttributeForm() {
    return new FormGroup({
      attribute: new FormControl(''),
      bonus: new FormControl(''),
      effect: new FormControl(''),
    });
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }
}
