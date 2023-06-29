import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestingComponent } from './components/testing/testing.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { AvatarComponent } from './components/character-detail/avatar/avatar.component';
import { AbilityComponent } from './components/character-detail/ability/ability.component';
import { HitPointsComponent } from './components/character-detail/hit-points/hit-points.component';
import { ArmorComponent } from './components/character-detail/armor/armor.component';
import { ProficiencyComponent } from './components/character-detail/proficiency/proficiency.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    CharacterDetailComponent,
    AvatarComponent,
    AbilityComponent,
    HitPointsComponent,
    ArmorComponent,
    ProficiencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
