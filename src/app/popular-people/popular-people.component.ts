import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../mock-people';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss']
})
export class PopularPeopleComponent implements OnInit {

  people = [];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getPopularPeople().subscribe(data => {
      this.people = data['results'];
    });
  }

}
