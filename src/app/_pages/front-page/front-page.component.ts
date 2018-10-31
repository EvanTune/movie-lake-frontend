import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../_services/movie.service';
import {TvService} from '../../_services/tv.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  popularMovies = [{}, {}, {}, {}, {}, {}];
  popularShows = [{}, {}, {}, {}, {}, {}];
  theatreMoviesLoaded: boolean;
  popularShowsLoaded: boolean;

  constructor(
    private movieService: MovieService,
    private tvService: TvService
  ) { }

  ngOnInit() {

    this.movieService.getPopularMovies().subscribe(data => {
      this.popularMovies = data['results'];
      this.theatreMoviesLoaded = true;
    });
    this.tvService.getPopularTv().subscribe(data => {
      this.popularShows = data['results'];
      this.popularShowsLoaded = true;
    });
  }



}
