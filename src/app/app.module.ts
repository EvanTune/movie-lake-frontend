import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng4-click-outside';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieComponent } from './_pages/movie/movie.component';
import { FrontPageComponent } from './_pages/front-page/front-page.component';
import { TopBarSearchComponent } from './top-bar-search/top-bar-search.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonImgComponent } from './button-img/button-img.component';
import { PopularPeopleComponent } from './popular-people/popular-people.component';
import { HeaderOneComponent } from './header-one/header-one.component';
import { InTheatresComponent } from './in-theatres/in-theatres.component';
import { ButtonSocialComponent } from './button-social/button-social.component';
import { MovieSliderComponent } from './movie-slider/movie-slider.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PopularDiscussionsComponent } from './popular-discussions/popular-discussions.component';
import { PersonComponent } from './_pages/person/person.component';
import { ImagesComponent } from './images/images.component';
import { TvComponent } from './_pages/tv/tv.component';
import { CastComponent } from './cast/cast.component';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { SeasonComponent } from './_pages/season/season.component';
import { EpisodeComponent } from './_pages/episode/episode.component';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CarouselComponent,
    PopularMoviesComponent,
    FrontPageComponent,
    TopBarSearchComponent,
    FooterComponent,
    MovieComponent,
    ButtonImgComponent,
    PopularPeopleComponent,
    HeaderOneComponent,
    InTheatresComponent,
    ButtonSocialComponent,
    MovieSliderComponent,
    UpcomingComponent,
    PopularDiscussionsComponent,
    PersonComponent,
    ImagesComponent,
    TvComponent,
    CastComponent,
    ScrollableComponent,
    SeasonComponent,
    EpisodeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxContentLoadingModule,
    FormsModule,
    ClickOutsideModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
