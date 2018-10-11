import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {min} from 'rxjs/operators';
import {getLangugaeFromIso} from '../helpers/language';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  id = 0;
  movie = {
    'poster_path': '/assets/images/placeholder-poster.png'
  };
  videos = [];
  images = [];
  crew = [];
  cast = [];
  trailerUrl;

  movieLoaded = false;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) {
  }

  getMoney(money) {
    return this.formatter.format(money);
  }

  getGenres() {
    let genres = '';
    for (let i = 0; i < this.movie['genres'].length; i++) {
      if (i > 2) {break;}
      genres += this.movie['genres'][i].name;

      if (i < 2) {
        genres += ', ';
      }

    }
    return genres;
  }

  getRuntime(time) {

    const hour = Math.floor(time / 60);
    const minutes = Math.floor((time / 60 - hour) * 60);

    if (hour >= 1) {
      return hour + 'h ' + minutes + 'm';
    } else {
      return minutes + 'm';
    }

  }

  getDirector() {

    let director = '';

    for (let i = 0; i < this.crew.length; i++) {
      if (this.crew[i].job === 'Director') {
        director = this.crew[i].name;
        break;
      }

    }

    return director;

  }

  getLanguage(iso) {
    return getLangugaeFromIso(iso);
  }

  getYear() {

  }


  ngOnInit() {
    this.getRuntime(112);

    this.id = this.route.snapshot.params.id;

    this.movieService.getMovie(this.id).subscribe(data => {
      this.movie = data;
      this.movie['poster_path'] = 'https://image.tmdb.org/t/p/w500' + this.movie['poster_path'];
      console.log(data);
      this.movieLoaded = true;
    });

    this.movieService.getMovieVideos(this.id).subscribe(data => {
      this.videos = data['results'];
      console.log(this.videos);
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videos[0].key);
    });


    this.movieService.getMovieCredits(this.id).subscribe(data => {
      this.crew = data['crew'];
      this.cast = data['cast'];
      console.log(data);
    });

    this.movieService.getMovieImages(this.id).subscribe(data => {
      console.log(data);
      this.images = data['backdrops'];
    });


  }

}
