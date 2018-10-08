import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../mock-people';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss']
})
export class PopularPeopleComponent implements OnInit {

  people = PEOPLE;

  constructor() { }

  ngOnInit() {
  }

}
