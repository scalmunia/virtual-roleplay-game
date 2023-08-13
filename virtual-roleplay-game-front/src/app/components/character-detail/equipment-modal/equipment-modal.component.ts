import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'vrg-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.css']
})

export class EquipmentModalComponent implements OnInit {
  form: FormGroup;
  // object: FormGroup;
  // attribute: any;
  // attribute: FormGroup;
  attributes: FormArray;
  color: 'grey' | 'blue' | 'yellow' = 'grey';
  error: Error | null = null;
  equipmentObject = {
    name: '',
    quality: '',
    description: '',
    img: '',
    attributes: [
      {
        attribute: '',
        bonus: 0,
        effecct: ''
      }
    ]
  }

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.maxLength(40),
      ]),
      quality: new FormControl(''),
      description: new FormControl('', [
        Validators.maxLength(256),
      ]),
    });
    this.attributes = new FormArray([
      new FormGroup({
        attribute: new FormControl(''),
        bonus: new FormControl('')
      })
    ])

    // this.attributes = this.form.get('attributes') as FormArray;
  }

  ngOnInit(): void { }

  onSubmit() {
    // Cambiar la clase del contenedor según la calidad seleccionada
    const qualityValue = this.form.controls['quality'].value;
    this.color = qualityValue === 'common' ? 'grey' :
      qualityValue === 'rare' ? 'blue' :
        qualityValue === 'legendary' ? 'yellow' :
          'grey';

    this.equipmentObject.name = this.form.controls['name'].value;
    this.equipmentObject.quality = this.form.controls['quality'].value;
    this.equipmentObject.description = this.form.controls['description'].value;
    this.equipmentObject.attributes = this.form.controls['attributes'].value;
    console.log('equipmentObject', this.equipmentObject);
    // console.log(this.equipmentObject.attributes);
  }

  addAttribute() {
    const attributeForm = new FormGroup({
      attribute: new FormControl(''),
      bonus: new FormControl('')
    });
    this.attributes.push(attributeForm);

    console.log('atributes.value', this.attributes.value);
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }
}
