import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../_services/people.service';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss']
})
export class PopularPeopleComponent implements OnInit {

  people = [{},{},{},{},{},{},{}];
  peopleLoaded: boolean;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getPopularPeople().subscribe(data => {
      this.people = data['results'];
      this.peopleLoaded = true;

    });
  }

}
