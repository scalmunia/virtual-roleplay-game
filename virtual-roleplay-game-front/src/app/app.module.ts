import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';

import { AppComponent } from './app.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { AvatarComponent } from './components/character-detail/avatar/avatar.component';
import { AbilityComponent } from './components/character-detail/ability/ability.component';
import { HitPointsComponent } from './components/character-detail/hit-points/hit-points.component';
import { ArmorComponent } from './components/character-detail/armor/armor.component';
import { ProficiencyComponent } from './components/character-detail/proficiency/proficiency.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';

import { AddSignFilter } from 'src/app/filters/addSignFilter';
import { CharacterLinkComponent } from './components/characters-list/character-link/character-link.component';
import { NavComponent } from './components/nav/nav.component';
import { EquipmentItemComponent } from './components/character-detail/equipment-item/equipment-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterDetailComponent,
    AvatarComponent,
    AbilityComponent,
    HitPointsComponent,
    ArmorComponent,
    ProficiencyComponent,
    RegisterComponent,
    LoginComponent,
    CharactersListComponent,
    AddSignFilter,
    CharacterLinkComponent,
    NavComponent,
    EquipmentItemComponent
  ],
  imports: [
    BrowserModule,
    QuillModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
