import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../_services/movie.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {getLangugaeFromIso} from '../../_helpers/language';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-item',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {


  id: number = 0;
  movie: object = {};
  videos: object[] = [];
  images: object[] = [];
  crew: object[] = [];
  cast: object[] = [];
  trailerUrl: SafeUrl;

  movieLoaded: boolean;

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
    route.params.subscribe(val => {

      this.clearPrev();
      this.getRuntime(112);

      this.id = val.id;

      this.setupMovie();
      this.setupMovieVideos();
      this.setupMovieCredits();
      this.setupMovieImages();
    });
  }

  roundToNearestInt(number: number): number {
    return Math.round(number);
  }

  clearPrev(): void {
    this.movieLoaded = false;
    this.movie = {};
    this.videos = [];
    this.images = [];
    this.crew = [];
    this.cast = [];
  }

  getMoney(money: number): string {
    return this.formatter.format(money);
  }

  getGenres(): string {
    let genres = '';
    for (let i = 0; i < this.movie['genres'].length; i++) {
      if (i > 2) {
        break;
      }
      genres += this.movie['genres'][i].name;

      if (i < 2) {
        genres += ', ';
      }

    }
    return genres;
  }

  getRuntime(time: number): string {

    const hour = Math.floor(time / 60);
    const minutes = Math.floor((time / 60 - hour) * 60);

    if (hour >= 1) {
      return hour + 'h ' + minutes + 'm';
    } else {
      return minutes + 'm';
    }

  }

  getDirector(): string {

    let director = '';

    for (let i = 0; i < this.crew.length; i++) {
      if (this.crew[i]['job'] === 'Director') {
        director = this.crew[i]['name'];
        break;
      }

    }

    return director;

  }

  getLanguage(iso) {
    return getLangugaeFromIso(iso);
  }

  setupMovie() {
    this.movie = {
      'poster_path': '/assets/images/placeholder-poster.png'
    };
    this.movieService.getMovie(this.id).subscribe(data => {
      this.movie = data;
      this.movie['poster_path'] = 'https://image.tmdb.org/t/p/w300' + this.movie['poster_path'];
      this.movieLoaded = true;
    });
  }

  setupMovieVideos(): void {
    this.movieService.getMovieVideos(this.id).subscribe(data => {
      this.videos = data['results'];

      if (this.videos.length) {
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videos[0]['key']);
      }

    });
  }

  setupMovieCredits(): void {
    this.movieService.getMovieCredits(this.id).subscribe(data => {
      this.crew = data['crew'];
      this.cast = data['cast'];
    });
  }

  setupMovieImages(): void {
    this.movieService.getMovieImages(this.id).subscribe(data => {
      this.images = data['backdrops'];
    });
  }

  ngOnInit() {
  }

}
