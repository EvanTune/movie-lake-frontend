import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {PeopleService} from '../../_services/people.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  person: object = {};
  acting: object[] = [];
  production: object[] = [];
  knownFor: object[] = [];
  images: object[] = [];
  id: number = 0;

  personLoaded: boolean;
  creditsLoaded: boolean;

  actingLength: number = 20;
  innerWidth: number = 0;
  currentOffset: number = 0;
  last: number = 0;
  acceleration: number = 0;
  panInterval: any = null;
  scrolling: boolean;

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
      this.innerWidth = window.innerWidth;
      this.id = val.id;

      this.clearPrev();
      this.setupPerson();
      this.setupCredits();
      this.setupImages();
    });
  }

  ngOnInit() {}

  clearPrev(): void {
    this.personLoaded = false;
    this.creditsLoaded = false;
    this.person = {};
    this.acting = [];
    this.production = [];
    this.knownFor = [];
    this.images = [];
  }

  navigateToItem(type: string, id: number): void {
    this.router.navigate([type + '/' + id]);
  }

  setOffset(e: object): void {
    if (!this.scrolling) {
      const screenWidth = e['center'];
      this.currentOffset = this.knownEle.nativeElement.scrollLeft;
      this.last = e['center'].x;

    }
  }

  panRight(e: object): void {
    if (!this.scrolling) {
      this.knownEle.nativeElement.scrollLeft = this.last - e['center'].x + this.currentOffset;
    }
  }

  panLeft(e: object): void {
    if (!this.scrolling) {
      this.knownEle.nativeElement.scrollLeft = this.last - e['center'].x + this.currentOffset;
    }
  }

  panEnd(e: object): void {
    if (!this.scrolling) {

      if (Math.abs(e['overallVelocity']) > 0.6 && e['distance'] < 600) {
        this.acceleration = Math.floor(e['overallVelocity'] * 22);
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

  setupCredits(): void {
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
        if (a['date'] > b['date']) {
          return -1;
        }
        if (a['date'] < b['date']) {
          return 1;
        }
        return 0;
      });

      this.knownFor.sort((a, b) => {
        if (a['popularity'] > b['popularity']) {
          return -1;
        }
        if (a['popularity'] < b['popularity']) {
          return 1;
        }
        return 0;
      });

      this.creditsLoaded = true;

    });
  }

  setupPerson(): void {
    this.person = {
      'profile_path': '/assets/images/placeholder-poster.png'
    };
    this.peopleService.getPerson(this.id).subscribe(data => {
      this.person = data;
      this.person['profile_path'] = 'https://image.tmdb.org/t/p/w300' + this.person['profile_path'];
      this.personLoaded = true;
    });
  }

  setupImages(): void {
    this.peopleService.getImages(this.id).subscribe(data => {
      this.images = data['profiles'];
    });
  }

}
