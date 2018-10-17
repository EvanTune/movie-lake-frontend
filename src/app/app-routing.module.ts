import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import {FrontPageComponent} from './front-page/front-page.component';
import {PersonComponent} from './person/person.component';
import {TvComponent} from './tv/tv.component';
import {SeasonComponent} from './season/season.component';
import {EpisodeComponent} from './episode/episode.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'movie/:id', component: ItemComponent },
  { path: 'tv/:id', component: TvComponent },
  { path: 'tv/:id/season/:id2', component: SeasonComponent },
  { path: 'tv/:id/season/:id2/episode/:id3', component: EpisodeComponent },
  { path: 'person/:id', component: PersonComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
