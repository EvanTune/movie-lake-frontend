import { Component, OnInit } from '@angular/core';
import { TvService } from '../../_services/tv.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {

  shows: object[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  sort: string = 'popularity.desc';
  year: string = '';
  genres = [];
  moviesLoaded: boolean;
  loadingList: boolean;
  totalResults: number = 0;

  allGenres = [
    {
      'id': 10759,
      'name': 'Action & Adventure'
    },
    {
      'id': 16,
      'name': 'Animation'
    },
    {
      'id': 35,
      'name': 'Comedy'
    },
    {
      'id': 80,
      'name': 'Crime'
    },
    {
      'id': 99,
      'name': 'Documentary'
    },
    {
      'id': 18,
      'name': 'Drama'
    },
    {
      'id': 10751,
      'name': 'Family'
    },
    {
      'id': 10762,
      'name': 'Kids'
    },
    {
      'id': 9648,
      'name': 'Mystery'
    },
    {
      'id': 10763,
      'name': 'News'
    },
    {
      'id': 10764,
      'name': 'Reality'
    },
    {
      'id': 10765,
      'name': 'Sci-Fi & Fantasy'
    },
    {
      'id': 10766,
      'name': 'Soap'
    },
    {
      'id': 10767,
      'name': 'Talk'
    },
    {
      'id': 10768,
      'name': 'War & Politics'
    },
    {
      'id': 37,
      'name': 'Western'
    }
    ];

  constructor(
    private tvService: TvService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.setDataFromParams(params);
      this.addShows(this.getGenreString(), 1);
    });
  }

  ngOnInit() {
    const s = this.getGenreString();
    this.addShows(s, 1);
  }

  setDataFromParams(params) {
    if (params['year']) {
      this.year = params['year'];
    }
    if (params['sort']) {
      this.sort = params['sort'];
    }

    if (this.genres.length === 0 && params['genres']) {
      const genreIds = params['genres'].split(',');

      for (let i = 0; i < genreIds.length; i++) {
        for (let j = 0; j < this.allGenres.length; j++) {
          if (!parseInt(genreIds[i], 10)) {
            continue;
          }
          if (parseInt(genreIds[i], 10) === this.allGenres[j]['id']) {
            this.genres.push(this.allGenres[j]);
          }
        }
      }
    }
  }

  addShows(genres, page) {

    this.moviesLoaded = false;

    if (page === 1) {
      for (let i = 0; i < this.shows.length; i++) {
        this.shows[i]['image'] = '/assets/images/placeholder-poster.png';
        this.shows[i]['image_mobile'] = '/assets/images/placeholder-poster.png';
        this.shows[i]['loaded'] = false;
      }
    }

    this.tvService.getDiscover(this.sort, this.year, genres, page).subscribe(data => {


      if (page === 1) {
        this.shows = data['results'];
        this.totalResults = data['total_results'];
      } else {
        this.shows = this.shows.concat(data['results']);
      }

      for (let i = 0; i < this.shows.length; i++) {
        this.shows[i]['image'] = 'https://image.tmdb.org/t/p/w342' + this.shows[i]['poster_path'];
        this.shows[i]['image_mobile'] = 'https://image.tmdb.org/t/p/w780' + this.shows[i]['backdrop_path'];
        this.shows[i]['loaded'] = true;
        this.shows[i]['date'] = this.shows[i]['first_air_date'];
      }

      this.moviesLoaded = true;
      this.loadingList = false;

    });

  }

  getGenreString() {
    let string = '';

    for (let i = 0; i < this.genres.length; i++) {
      string += this.genres[i]['id'];

      if (i < this.genres.length - 1) {
        string += ',';
      }
    }

    return string;
  }

  filtersChanged(event) {

    this.loadingList = true;
    this.shows = [];

    if (event['name']) {
      let delay = 0;
      if (this.genres.length === 0) {
        delay = 50;
      }
      setTimeout(() => {
        this.genres.push(event);
        const s = this.getGenreString();
        this.addShows(s, 1);
      }, delay);

    } else {
      if (event['type'] === 'year') {
        this.year = event['value'];
      } else if (event['type'] === 'sort') {
        this.sort = event['value'];
      }

      const s = this.getGenreString();
      this.addShows(s, 1);
    }

  }

  addMoreShows(value) {
    const s = this.getGenreString();
    this.addShows(s, value, );
  }

}
