import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MOVIES} from '../mock-movies';
import {MovieService} from '../_services/movie.service';
import {Router} from '@angular/router';

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

  currentOffset = 0;
  last = 0;
  acceleration = 0;
  panInterval: any = null;
  scrolling = false;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
  }

  ngOnInit() {


    this.movieService.getTheatresMovies().subscribe(data => {
      this.movies = data['results'];
    });

  }

  navigateToMovie(id) {
    this.router.navigate(['/movie/' + id]);
  }

  setOffset(e) {
    if (!this.scrolling) {
      let screenWidth = e['center'];
      this.currentOffset = this.sliderElement.nativeElement.scrollLeft;
      this.last = e['center'].x;

    }
  }

  panRight(e) {
    console.log(this.scrolling);
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.sliderElement.nativeElement.scrollLeft = a;
    }
  }

  panLeft(e) {
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.sliderElement.nativeElement.scrollLeft = a;
    }
  }

  panEnd(e) {
    if (!this.scrolling) {

      if (Math.abs(e.overallVelocity) > 0.6) {
        this.acceleration = Math.floor(e.overallVelocity * 22);
      } else {
        this.acceleration = 0;
      }

      this.scrolling = true;
      this.panInterval = setInterval(() => {

        if (this.acceleration > 0) {

          this.sliderElement.nativeElement.scrollLeft -= this.acceleration;

          if (this.sliderElement.nativeElement.scrollLeft <= 0) {
            this.acceleration = 0;
          } else {
            this.acceleration--;
          }

        } else if (this.acceleration < 0) {

          this.sliderElement.nativeElement.scrollLeft -= this.acceleration;

          if (this.sliderElement.nativeElement.scrollLeft >= this.sliderElement.nativeElement.scrollWidth - this.sliderElement.nativeElement.clientWidth) {
            this.acceleration = 0;
          } else {
            this.acceleration++;
          }

          this.acceleration++;

        } else {
          clearInterval(this.panInterval);
          this.scrolling = false;

        }

      }, 16);
    }
  }

}
