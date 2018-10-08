import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MOVIES} from '../mock-movies';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss']
})
export class MovieSliderComponent implements OnInit {

  movies = MOVIES;
  scrollPosition = 0;
  @ViewChild('slider') sliderElement: ElementRef;


  constructor() { }

  ngOnInit() {
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
