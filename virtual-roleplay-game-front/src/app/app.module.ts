import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestingComponent } from './components/testing/testing.component';
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

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    CharacterDetailComponent,
    AvatarComponent,
    AbilityComponent,
    HitPointsComponent,
    ArmorComponent,
    ProficiencyComponent,
    RegisterComponent,
    LoginComponent,
    CharactersListComponent,
    AddSignFilter
  ],
  imports: [
    BrowserModule,
    QuillModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
