import {Component, HostListener, OnInit} from '@angular/core';
import {MovieService} from '../_services/movie.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-top-bar-search',
  templateUrl: './top-bar-search.component.html',
  styleUrls: ['./top-bar-search.component.scss'],
  animations: [
    trigger('resultsContainer', [
      state('open', style({
        height: '396px'
      })),
      state('open-mobile', style({
        height: 'calc(100vh - 50px)'
      })),
      state('closed', style({
        height: '0px'
      })),
      transition('open => closed', [
        animate('0.4s ease-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-in')
      ])
    ]),
    trigger('header', [
      state('open', style({
        opacity: '1'
      })),
      state('closed', style({
        opacity: '0'
      })),
      transition('open => closed', [
        animate('0.2s ease-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-in')
      ])
    ]),
    trigger('itemFade', [
      transition(':enter', [
        style({opacity: 0, marginLeft: '-12px'}),
        animate('0.35s ease-in', style({opacity: 1, marginLeft: '0'})),
      ]),
      transition(':leave', [
        style({opacity: 1, marginLeft: '0px'}),
        animate('0.35s ease-out', style({opacity: 0, marginLeft: '-12px'})),
      ])
    ])
  ]
})
export class TopBarSearchComponent implements OnInit {

  query: string = '';
  allMovies: object[] = [];
  allTv: object[] = [];
  allPeople: object[] = [];
  movies: object[] = [];
  tv: object[] = [];
  people: object[] = [];
  showHeaders: boolean;
  showNotFoundText: boolean;
  disableInput: boolean;

  loading: boolean;
  mobileMode: boolean;
  containerState: string = 'closed';
  mobileSearchMode: boolean;

  typingTimer: any = null;
  doneTypingInterval: number = 350;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobileMode = window.innerWidth < 992;
  }

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (this.containerState.includes('open')) {
          this.clearQuery();
        }
        this.mobileMode = window.innerWidth < 992;
        this.disableInput = router.url.startsWith('/search');
      }
    });
  }

  ngOnInit() {
  }

  navigateToSearchPage() {
    if (this.query.length > 1) {
      this.router.navigate(['/search'], {queryParams: {query: this.query}});
    }
  }

  addSlowlyToArray(array: object[], array2: object[], index: number): void {
    setInterval(() => {
      if (index >= array2.length || index === 6) {
        return;
      }
      array.push(array2[index]);
      index++;
    }, 85);
  }

  search(): void {

    if (this.query.length > 2) {

      this.loading = true;

      this.allMovies = [];
      this.allTv = [];
      this.allPeople = [];

      if (this.containerState.includes('open')) {
        this.movies = [];
        this.tv = [];
        this.people = [];
        this.showNotFoundText = false;
      }

      this.movieService.getSearchMulti(this.query, 1).subscribe(data => {

        this.addResultsToArrays(data['results']);

        if (this.mobileMode) {
          this.containerState = 'open-mobile';
        } else {
          this.containerState = 'open';
        }

        this.showHeaders = true;

        this.addSlowlyToArray(this.movies, this.allMovies, 0);
        this.addSlowlyToArray(this.tv, this.allTv, 0);
        this.addSlowlyToArray(this.people, this.allPeople, 0);

        setTimeout(() => {
          this.showHeaders = true;
          this.showNotFoundText = true;
        }, 600);

        setTimeout(() => {
          this.loading = false;
        }, 1000);

      });
    } else {
      if (!this.mobileMode) {
        this.closeSearch();
      } else {
        this.movies = [];
        this.tv = [];
        this.people = [];
      }
    }
  }

  addResultsToArrays(results) {
    for (let i = 0; i < results.length; i++) {
      if (results[i]['media_type'] === 'movie') {
        this.allMovies.push(results[i]);
      } else if (results[i]['media_type'] === 'tv') {
        this.allTv.push(results[i]);
      } else if (results[i]['media_type'] === 'person') {
        this.allPeople.push(results[i]);
      }

    }
  }

  closeSearch() {
    this.showHeaders = false;
    this.showNotFoundText = false;
    this.mobileSearchMode = false;
    this.movies = [];
    this.tv = [];
    this.people = [];

    setTimeout(() => {
      this.containerState = 'closed';
    }, 350);
  }


  clearQuery(): void {
    this.query = '';
    this.closeSearch();
  }

  clearTimeout1(): void {
    clearTimeout(this.typingTimer);
  }

  attemptSearch(): void {

    if (this.loading) {
      this.doneTypingInterval = 1300;
    } else {
      this.doneTypingInterval = 350;
    }

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.search();
    }, this.doneTypingInterval);
  }

}
