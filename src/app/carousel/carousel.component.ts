import {Component, ElementRef, HostListener, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MOVIES } from '../mock-movies';
import {MovieService} from '../_services/movie.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ViewChild('carousel') carouselElement: ElementRef;

  movies = [{}];
  currentPosition = 0;
  windowWidth = 0;

  constructor(
    private movieService: MovieService
  ) { }

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
    this.currentPosition++;
    this.carouselElement.nativeElement.scrollLeft += this.windowWidth;
    console.log(this.windowWidth);
  }

  prev(e) {
    this.currentPosition--;
    this.carouselElement.nativeElement.scrollLeft -= this.windowWidth;
  }

  setWindowWidth() {
    this.windowWidth = document.body.clientWidth;
  }

  setScrollLeft() {
    this.carouselElement.nativeElement.scrollLeft = this.windowWidth * this.currentPosition;
  }

  setupTopMovies() {
    this.movieService.getPopularMovies().subscribe(data => {

      this.movies = [];
      let count = 0;

      for (let i = 0; i < data['results'].length; i++) {

        if (i > 7 && i < 18) {
          this.movies.push(data['results'][i]);
          this.movies[count]['backdrop_path'] = 'https://image.tmdb.org/t/p/w1280' + this.movies[count]['backdrop_path'];
          count++;
        }
      }
      console.log(this.movies);
    });
  }

}
