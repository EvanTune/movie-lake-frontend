import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MOVIES} from '../mock-movies';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss']
})
export class MovieSliderComponent implements OnInit {

  movies = [];
  scrollPosition = 0;
  @ViewChild('slider') sliderElement: ElementRef;
  offset = 0;


  constructor(private movieService: MovieService) { }

  ngOnInit() {

    this.movieService.getTheatresMovies().subscribe(data => {
      this.movies = data['results'];
    });

  }

  panLeft() {
    console.log('fsdfsdf');
    this.setSliderScroll(0);
  }

  panRight() {
    console.log('fsdfsdf');
    this.setSliderScroll(1);
  }

  setSliderScroll(test) {
    if (test === 0) {
      this.sliderElement.nativeElement.scrollLeft += 9;
    } else {
      this.sliderElement.nativeElement.scrollLeft -= 9;
    }
  }


}
