import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestingComponent } from './components/testing/testing.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { AvatarComponent } from './components/character-detail/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    CharacterDetailComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
