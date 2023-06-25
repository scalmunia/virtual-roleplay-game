import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character/Character';
import { calcAbilityModifier } from 'src/app/models/Character/calcAbilityBonus';
import { calcMaximunLife } from 'src/app/models/Character/calcMaximunLife';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent {

}
