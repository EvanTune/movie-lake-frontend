import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar-search',
  templateUrl: './top-bar-search.component.html',
  styleUrls: ['./top-bar-search.component.scss']
})
export class TopBarSearchComponent implements OnInit {

  query = '';
  movies = [];
  tv = [];
  people = [];

  showContainer = false;
  showLoading = true;

  typingTimer: any = null;
  doneTypingInterval = 400;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    router.events.subscribe(val => {
      this.clearQuery();
    });
  }

  ngOnInit() {
  }

  search() {

    if (this.query.length > 2) {

      this.showContainer = true;
      this.showLoading = true;

      this.movies = [];
      this.tv = [];
      this.people = [];

      this.movieService.getSearch(this.query).subscribe(data => {

        for (let i = 0; i < data['results'].length; i++) {
          if (data['results'][i]['media_type'] === 'movie') {

            this.movies.push(data['results'][i]);

          } else if (data['results'][i]['media_type'] === 'tv') {

            this.tv.push(data['results'][i]);

          } else if (data['results'][i]['media_type'] === 'person') {

            this.people.push(data['results'][i]);

          }

        }
        this.showLoading = false;
      });
    } else {
      this.showContainer = false;
    }
  }

  redirectAndClear(link) {

    this.router.navigate(['/movie', link]);
    this.showContainer = false;

  }

  clearQuery() {
    this.query = '';
    this.showContainer = false;
    this.showLoading = true;
  }

  clearTimeout1() {
    clearTimeout(this.typingTimer);
  }

  attemptSearch() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.search()
    }, this.doneTypingInterval);
  }

}
