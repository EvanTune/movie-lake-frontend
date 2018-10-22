import {Component, ElementRef, HostListener, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MovieService} from '../_services/movie.service';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('arrowFade', [
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
        opacity: '0'
      })),
      transition('show => hide', [
        animate('0.2s ease-out')
      ]),
      transition('hide => show', [
        animate('0.2s ease-in')
      ])
    ]),
  ]
})
export class CarouselComponent implements OnInit {

  @ViewChild('carousel') carouselElement: ElementRef;
  @ViewChild('dots') dotsElement: ElementRef;

  movies: object[] = [];
  currentPosition: number = 0;
  windowWidth: number = 0;
  showArrows: boolean;
  canSlide: boolean = true;

  constructor(
    private movieService: MovieService
  ) {
  }

  ngOnInit() {
    this.setupTopMovies();
  }

  ngAfterViewInit() {
    this.setWindowWidth();
    this.setScrollLeft();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setWindowWidth();
    this.setScrollLeft();
  }

  next(e) {
    if (this.canSlide && this.currentPosition < this.movies.length - 1) {
      this.currentPosition++;
      this.carouselElement.nativeElement.scrollLeft += this.windowWidth;
      this.canSlide = false;
      setTimeout(() => {
        this.canSlide = true;
      }, 800);
    }
  }

  prev(e) {
    if (this.canSlide && this.currentPosition > 0) {
      this.currentPosition--;
      this.carouselElement.nativeElement.scrollLeft -= this.windowWidth;
      this.canSlide = false;
      setTimeout(() => {
        this.canSlide = true;
      }, 800);
    }
  }

  panRight(e) {
    this.prev(e);
  }

  panLeft(e) {
    this.next(e);
  }

  setWindowWidth() {
    this.windowWidth = document.body.clientWidth;
  }

  setScrollLeft() {
    this.carouselElement.nativeElement.scrollLeft = this.windowWidth * this.currentPosition;
  }

  setupTopMovies() {
    this.movies = [{
      'backdrop_path': '/assets/images/placeholder-poster.png'
    }];
    this.movieService.getPopularMovies().subscribe(data => {

      this.movies = [];
      let count = 0;

      for (let i = 0; i < data['results'].length; i++) {

        if (i > 7 && i < 16) {
          this.movies.push(data['results'][i]);
          this.movies[count]['backdrop_path'] = 'https://image.tmdb.org/t/p/w1280' + this.movies[count]['backdrop_path'];
          count++;
        }
      }
     this.setDotsLeft();
    });
  }

  setDotsLeft() {
    const dotAmount = this.movies.length;
    this.dotsElement.nativeElement.style.left = 'calc(50% - ' + dotAmount * 15 + 'px)';
  }

  setSlidePosition(index) {
    if (this.canSlide) {
      this.currentPosition = index;
      this.carouselElement.nativeElement.scrollLeft = this.windowWidth * index;
      this.canSlide = false;
      setTimeout(() => {
        this.canSlide = true;
      }, 800);
    }
  }

}
