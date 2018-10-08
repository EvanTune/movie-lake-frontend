import { Component, OnInit } from '@angular/core';
import {MOVIES} from '../mock-movies';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  movies = MOVIES;

  constructor() { }

  ngOnInit() {
  }

}
