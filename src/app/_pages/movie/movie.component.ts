import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../_services/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {getLangugaeFromIso} from '../../_helpers/language';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {getScoreColorFromScore} from '../../_helpers/score';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-item',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  animations: [
    trigger('fade', [
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
        opacity: '0'
      })),
      transition('show => hide', [
        animate('0.3s ease-out')
      ]),
      transition('hide => show', [
        animate('0.3s ease-in')
      ])
    ]),
    trigger('slideBody', [
      state('show', style({
        height: '100%'
      })),
      state('hide', style({
        height: '0'
      })),
      transition('show => hide', [
        animate('0.6s ease-in-out')
      ]),
      transition('hide => show', [
        animate('0.6s ease-in-out')
      ])
    ]),
  ]
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
  getScoreColorFromScore = getScoreColorFromScore;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  showTrailer: boolean;
  showOverlay: boolean;
  showBody: boolean;
  showExitBtn: boolean;
  @ViewChild('trailer') trailer: ElementRef;
  @ViewChild('modalExitBtn') modalExitBtn: ElementRef;
  @ViewChild('videoTrailer') videoTrailer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router
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

  showTrailerModal() {

    this.showOverlay = true;

    setTimeout(() => {
      this.showBody = true;
    }, 400);
    setTimeout(() => {
      this.showTrailer = true;
      this.modalExitBtn.nativeElement.style.display = 'inline-block';
      this.showExitBtn = true;

    }, 900);
    this.trailer.nativeElement.style.display = 'block';

  }

  exitTrailerModal() {
    this.showTrailer = false;
    this.showExitBtn = false;

    setTimeout(() => {
      this.showBody = false;
    }, 300);
    setTimeout(() => {
      this.showOverlay = false;
    }, 800);
    setTimeout(() => {
      this.trailer.nativeElement.style.display = 'none';
    }, 1100);
  }

  stopBodyProp(e) {
    e.stopPropagation();
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

      if (i < 2 && i !== this.movie['genres'].length - 1) {
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
      if (data['status_code'] && data['status_code'] === 34) {
        this.router.navigate(['/404']);
      }
      this.movie = data;
      this.movie['poster_path'] = 'https://image.tmdb.org/t/p/w300' + this.movie['poster_path'];
      this.movieLoaded = true;
    });
  }

  setupMovieVideos(): void {
    this.movieService.getMovieVideos(this.id).subscribe(data => {
      if (data['status_code'] && data['status_code'] === 34) {
        return;
      }
      this.videos = data['results'];

      if (this.videos.length) {
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videos[0]['key'] + '?enablejsapi=1');
      }

    });
  }

  setupMovieCredits(): void {
    this.movieService.getMovieCredits(this.id).subscribe(data => {
      if (data['status_code'] && data['status_code'] === 34) {
        return;
      }
      this.crew = data['crew'];
      this.cast = data['cast'];
    });
  }

  setupMovieImages(): void {
    this.movieService.getMovieImages(this.id).subscribe(data => {
      if (data['status_code'] && data['status_code'] === 34) {
        return;
      }
      this.images = data['backdrops'];
    });
  }

  ngOnInit() {
  }

}
