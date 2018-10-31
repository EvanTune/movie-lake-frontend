import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './_pages/movie/movie.component';
import {FrontPageComponent} from './_pages/front-page/front-page.component';
import {PersonComponent} from './_pages/person/person.component';
import {TvComponent} from './_pages/tv/tv.component';
import {SeasonComponent} from './_pages/season/season.component';
import {EpisodeComponent} from './_pages/episode/episode.component';
import {MoviesComponent} from './_pages/movies/movies.component';
import {TvShowsComponent} from './_pages/tv-shows/tv-shows.component';
import {PeopleComponent} from './_pages/people/people.component';
import {SearchComponent} from './_pages/search/search.component';
import {NotFoundComponent} from './_pages/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'tv/:id', component: TvComponent },
  { path: 'tv/:id/season/:id2', component: SeasonComponent },
  { path: 'tv/:id/season/:id2/episode/:id3', component: EpisodeComponent },
  { path: 'person/:id', component: PersonComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tv-shows', component: TvShowsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'search', component: SearchComponent },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
