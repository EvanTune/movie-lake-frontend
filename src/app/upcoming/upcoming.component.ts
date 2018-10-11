import { Component, OnInit } from '@angular/core';
import {MOVIES} from '../mock-movies';

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  movies = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getUpcomingMovies().subscribe(data => {
      this.movies = data['results'];
    });
  }

}
