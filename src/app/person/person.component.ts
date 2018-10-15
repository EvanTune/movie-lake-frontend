import {Component, OnInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import {PeopleService} from '../people.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  person = {};
  acting = [];
  production = [];
  knownFor = [];
  images = [];
  id = 0;

  personLoaded = false;
  creditsLoaded = false;

  actingLength = 20;
  innerWidth = 0;
  currentOffset = 0;
  last = 0;
  acceleration = 0;
  panInterval: any = null;
  scrolling = false;

  @ViewChild('knownElement') knownEle: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe(val => {

     this.clearPrev();

      this.innerWidth = window.innerWidth;
      this.id = val.id;

      this.setupPerson();
      this.setupCredits();
      this.setupImages();

    });
  }

  clearPrev() {
    this.personLoaded = false;
    this.creditsLoaded = false;
    this.person = {};
    this.acting = [];
    this.production = [];
    this.knownFor = [];
    this.images = [];
  }

  navigateToItem(id) {
    console.log('fff');
    this.router.navigate(['movie/' + id]);
  }


  setOffset(e) {
    if (!this.scrolling) {
      let screenWidth = e['center'];
      this.currentOffset = this.knownEle.nativeElement.scrollLeft;
      this.last = e['center'].x;

    }
  }

  panRight(e) {
    console.log(this.scrolling);
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.knownEle.nativeElement.scrollLeft = a;
    }
  }

  panLeft(e) {
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.knownEle.nativeElement.scrollLeft = a;
    }
  }

  panEnd(e) {
    if (!this.scrolling) {

      if (Math.abs(e.overallVelocity) > 0.6 && e.distance < 400) {
        this.acceleration = Math.floor(e.overallVelocity * 22);
      } else {
        this.acceleration = 0;
      }

      this.scrolling = true;
      this.panInterval = setInterval(() => {

        if (this.acceleration > 0) {

          this.knownEle.nativeElement.scrollLeft -= this.acceleration;

          if (this.knownEle.nativeElement.scrollLeft <= 0) {
            this.acceleration = 0;
          } else {
            this.acceleration--;
          }

        } else if (this.acceleration < 0) {

          this.knownEle.nativeElement.scrollLeft -= this.acceleration;

          if (this.knownEle.nativeElement.scrollLeft >= this.knownEle.nativeElement.scrollWidth - this.knownEle.nativeElement.clientWidth) {
            this.acceleration = 0;
          } else {
            this.acceleration++;
          }

        } else {
          clearInterval(this.panInterval);
          this.scrolling = false;

        }

      }, 16);
    }
  }

  setupCredits() {
    this.peopleService.getCredits(this.id).subscribe(data => {

      for (let i = 0; i < data['cast'].length; i++) {
        if (data['cast'][i]['media_type'] === 'movie' || data['cast'][i]['media_type'] === 'tv') {
          if (data['cast'][i]['release_date']) {
            data['cast'][i]['date'] = data['cast'][i]['release_date'];
            this.acting.push(data['cast'][i]);
            this.knownFor.push(data['cast'][i]);
          } else if (data['cast'][i]['first_air_date']) {
            data['cast'][i]['date'] = data['cast'][i]['first_air_date'];
            this.acting.push(data['cast'][i]);
            this.knownFor.push(data['cast'][i]);
          }
        }
      }

      for (let i = 0; i < data['crew'].length; i++) {
        if (data['crew'][i]['department'] === 'Production') {
          this.production.push(data['crew'][i]);
        }
      }

      this.acting.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });

      this.knownFor.sort((a, b) => {
        if (a.popularity > b.popularity) {
          return -1;
        }
        if (a.popularity < b.popularity) {
          return 1;
        }
        return 0;
      });

      this.creditsLoaded = true;

    });
  }

  setupPerson() {
    this.person = {
      'profile_path': '/assets/images/placeholder-poster.png'
    };
    this.peopleService.getPerson(this.id).subscribe(data => {
      this.person = data;

      this.person['profile_path'] = 'https://image.tmdb.org/t/p/w500' + this.person['profile_path'];

      this.personLoaded = true;
    });
  }

  setupImages() {
    this.peopleService.getImages(this.id).subscribe(data => {
      this.images = data['profiles'];
      console.log('got images');
    });
  }

  ngOnInit() {


  }

}
