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
  movies = [];
  tv = [];
  production = [];
  knownFor = [];
  id = 0;

  personLoaded = false;
  creditsLoaded = false;

  actingLength = 12;
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

  navigateToItem(id) {
    console.log('fff');
    this.router.navigate(['movie/' + id]);
  }

  panEnd(e) {
    if (!this.scrolling) {

      console.log(e.distance);

      if (Math.abs(e.overallVelocity) > 1 && e.distance < 550) {
        this.acceleration = Math.floor(e.overallVelocity * 15);
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

            this.acceleration++;

        } else {
          clearInterval(this.panInterval);
          console.log(this.acceleration);
          this.scrolling = false;

        }

      }, 20);
    }
  }

  ngOnInit() {

    this.person = {
      'profile_path': '/assets/images/placeholder-poster.png'
    };

    this.innerWidth = window.innerWidth;
    this.id = this.route.snapshot.params.id;

    this.peopleService.getPerson(this.id).subscribe(data => {
      this.person = data;

      this.person['profile_path'] = 'https://image.tmdb.org/t/p/w500' + this.person['profile_path'];

      this.personLoaded = true;
    });

    this.peopleService.getCredits(this.id).subscribe(data => {

      for (let i = 0; i < data['cast'].length; i++) {
        if (data['cast'][i]['media_type'] === 'movie') {
          this.movies.push(data['cast'][i]);
          this.knownFor.push(data['cast'][i]);
        } else if (data['cast'][i]['media_type'] === 'tv') {
          this.tv.push(data['cast'][i]);
          this.knownFor.push(data['cast'][i]);
        }
      }

      for (let i = 0; i < data['crew'].length; i++) {
        if (data['crew'][i]['department'] === 'Production') {
          this.production.push(data['crew'][i]);
        }
      }

      this.movies.sort((a, b) => {
        if (a.release_date > b.release_date) {
          return -1;
        }
        if (a.release_date < b.release_date) {
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

}
