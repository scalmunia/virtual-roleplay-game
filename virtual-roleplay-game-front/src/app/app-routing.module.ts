import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestingComponent } from './components/testing/testing.component';
import { RegisterComponent } from './components/register/register.component';
import { CharacterDetailComponent  } from './components/character-detail/character-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'testing', component: TestingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'character-detail', component: CharacterDetailComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
