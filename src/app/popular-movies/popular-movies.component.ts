import { Component, OnInit } from '@angular/core';
import { MOVIES } from '../mock-movies';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {

  movies = MOVIES;

  constructor() { }

  ngOnInit() {



  }

}
