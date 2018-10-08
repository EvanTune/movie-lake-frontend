import { Component, OnInit } from '@angular/core';
import { MOVIES } from '../mock-movies';


@Component({
  selector: 'app-in-theatres',
  templateUrl: './in-theatres.component.html',
  styleUrls: ['./in-theatres.component.scss']
})
export class InTheatresComponent implements OnInit {

  movies = MOVIES;

  constructor() { }

  ngOnInit() {
  }

}
