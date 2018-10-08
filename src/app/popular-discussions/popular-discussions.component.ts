import { Component, OnInit } from '@angular/core';
import {MOVIES} from '../mock-movies';

@Component({
  selector: 'app-popular-discussions',
  templateUrl: './popular-discussions.component.html',
  styleUrls: ['./popular-discussions.component.scss']
})
export class PopularDiscussionsComponent implements OnInit {

  movies = MOVIES;

  constructor() { }

  ngOnInit() {
  }

}
