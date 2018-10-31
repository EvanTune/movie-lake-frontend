import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../_services/movie.service';
import {TvService} from '../../_services/tv.service';
import {PeopleService} from '../../_services/people.service';
import {NavigationEnd, Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  moviesLoaded: boolean;
  loadingList: boolean;
  totalResults: number = 0;
  items: object[] = [];
  searchType: string = 'movie';
  query: string = '';

  typingTimer: any = null;
  doneTypingInterval: number = 400;

  constructor(
    private movieService: MovieService,
    private tvService: TvService,
    private personService: PeopleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Route params updated
    this.route.queryParams.subscribe(params => {
      if (params['query'] && params['query'].length > 1) {
        this.query = params['query'];
      }
      if (params['type'] === 'movie') {
        this.searchType = 'movie';
      } else if (params['type'] === 'tv') {
        this.searchType = 'tv';
      } else if (params['type'] === 'person') {
        this.searchType = 'person';
      }
    });
    // Router updates
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.search(1);
      }
    });
  }

  ngOnInit() {
  }

  changeSearchMode(type) {
    this.searchType = type;
    this.changeURL(this.query, type);
    this.search(1);
  }

  search(page) {

    if (this.query.length < 2) {
      this.items = [];
      this.moviesLoaded = false;
      return;
    }

    this.moviesLoaded = false;

    if (page === 1) {
      this.items = [];
      this.loadingList = true;
    }

    this.getServiceString().getSearch(this.query, page).subscribe(data => {

      if (page === 1) {
        this.items = data['results'];
        this.totalResults = data['total_results'];
      } else {
        this.items = this.items.concat(data['results']);
      }

      this.addMetaToItems();

      this.moviesLoaded = true;
      this.loadingList = false;

    });
  }

  addMetaToItems() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]['poster_path']) {
        this.items[i]['image'] = 'https://image.tmdb.org/t/p/w185' + this.items[i]['poster_path'];
      } else if (this.items[i]['profile_path']) {
        this.items[i]['image'] = 'https://image.tmdb.org/t/p/w185' + this.items[i]['profile_path'];
      } else {
        this.items[i]['image'] = '/assets/images/placeholder-poster.png';
      }

      if (this.items[i]['backdrop_path']) {
        this.items[i]['image_mobile'] = 'https://image.tmdb.org/t/p/w780' + this.items[i]['backdrop_path'];
      } else {
        this.items[i]['image_mobile'] = '/assets/images/placeholder-still.png';
      }

      if (this.items[i]['release_date']) {
        this.items[i]['date'] = this.items[i]['release_date'];
      } else if (this.items[i]['first_air_date']) {
        this.items[i]['date'] = this.items[i]['first_air_date'];
      }

      this.items[i]['loaded'] = true;
    }
  }

  getServiceString(): any {
    let searchService;

    if (this.searchType === 'movie') {
      searchService = this.movieService;
    } else if (this.searchType === 'tv') {
      searchService = this.tvService;
    } else {
      searchService = this.personService;
    }

    return searchService;
  }

  changeURL(query, type) {
    this.router.navigate(['/search'], {queryParams: {query: query, type: type}});
  }

  addMoreItems(value) {
    this.search(value);
  }

  clearTimeout1(): void {
    clearTimeout(this.typingTimer);
  }

  attemptSearch(): void {

    if (this.loadingList) {
      this.doneTypingInterval = 1300;
    } else {
      this.doneTypingInterval = 350;
    }

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.search(1);
    }, this.doneTypingInterval);
  }

}
