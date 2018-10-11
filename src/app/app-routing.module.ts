import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import {FrontPageComponent} from './front-page/front-page.component';
import {PersonComponent} from './person/person.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'movie/:id', component: ItemComponent },
  { path: 'person/:id', component: PersonComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
