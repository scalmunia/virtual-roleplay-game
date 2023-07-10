import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Character, ICharacter } from 'src/app/models/Character/Character';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'vrg-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent {

  htmlContent: any;
  modulesQuill = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      ['bold', 'italic', 'underline', 'strike'], 
      [{ 'color': [] }, { 'background': [] }],  
      // [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']         
    ]
  }
  
  form: FormGroup; 

  constructor(private characterService: CharacterService) {  
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      characterClass: new FormControl('', [Validators.required]),
      strength: new FormControl(''),
      dexterity: new FormControl(''),
      constitution: new FormControl(''),
      intelligence: new FormControl(''),
      wisdom: new FormControl(''),
      charisma: new FormControl('')
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    try {
      const token = localStorage.getItem('token');
      const { name, characterClass, strength, dexterity, constitution, intelligence, wisdom, charisma } = this.form.value;
      
      await this.characterService.create({
        name: name, 
        class: characterClass, 
        abilities: {
          strength: strength,
          dexterity: dexterity,
          constitution: constitution,
          intelligence: intelligence,
          wisdom: wisdom,
          charisma: charisma
        }
      }, token as string);
      console.log('PRESONAJE CREADO CORRECTAMENTE');

      return true;

    } catch (error) {
      console.log(error);

      return error;
    }
    
    
  }


  onChangedEditor(event: any): void {
    if(event.html) {
      this.htmlContent = event.html;
    }
  }
}




// var toolbarOptions = [
//   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//   ['blockquote', 'code-block'],

//   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//   [{ 'direction': 'rtl' }],                         // text direction

//   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//   [{ 'font': [] }],
//   [{ 'align': [] }],

//   ['clean']                                         // remove formatting button
// ];

// var quill = new Quill('#editor', {
//   modules: {
//     toolbar: toolbarOptions
//   },
//   theme: 'snow'
// });