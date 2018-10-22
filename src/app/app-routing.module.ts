import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './_pages/movie/movie.component';
import {FrontPageComponent} from './_pages/front-page/front-page.component';
import {PersonComponent} from './_pages/person/person.component';
import {TvComponent} from './_pages/tv/tv.component';
import {SeasonComponent} from './_pages/season/season.component';
import {EpisodeComponent} from './_pages/episode/episode.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'movie/:id', component: MovieComponent },
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
