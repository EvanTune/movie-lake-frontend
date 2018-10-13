import { Component, OnInit } from '@angular/core';
import { MOVIES } from '../mock-movies';
import { MovieService } from '../movie.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {

  movies = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {



    this.movieService.getPopularMovies().subscribe(data => {
      console.log(data['results']);
      this.movies = data['results'];
    });

  }

}
