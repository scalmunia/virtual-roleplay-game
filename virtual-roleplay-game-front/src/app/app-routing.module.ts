import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CharactersListComponent  } from './components/characters-list/characters-list.component';
import { CharacterDetailComponent  } from './components/character-detail/character-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'characters-list', component: CharactersListComponent },
  { path: 'character', component: CharacterDetailComponent }
  // { path: 'character', component: CharacterDetailComponent, data: { edit: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
