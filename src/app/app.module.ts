import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemComponent } from './item/item.component';
import { FrontPageComponent } from './front-page/front-page.component';
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
import { PersonComponent } from './person/person.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CarouselComponent,
    PopularMoviesComponent,
    ItemComponent,
    FrontPageComponent,
    TopBarSearchComponent,
    FooterComponent,
    ButtonImgComponent,
    PopularPeopleComponent,
    HeaderOneComponent,
    InTheatresComponent,
    ButtonSocialComponent,
    MovieSliderComponent,
    UpcomingComponent,
    PopularDiscussionsComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxContentLoadingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
