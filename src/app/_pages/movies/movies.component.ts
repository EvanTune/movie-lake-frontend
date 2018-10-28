import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../_services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: object[] = [{}, {}, {}, {}, {}, {}, {}, {}];
  sort: string = 'popularity.desc';
  year: string = '';
  selectedGenres = [];
  moviesLoaded: boolean;
  loadingList: boolean;
  totalResults: number = 0;

  allGenres = [
    {
      'id': 28,
      'name': 'Action'
    },
    {
      'id': 12,
      'name': 'Adventure'
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
      'id': 14,
      'name': 'Fantasy'
    },
    {
      'id': 36,
      'name': 'History'
    },
    {
      'id': 27,
      'name': 'Horror'
    },
    {
      'id': 10402,
      'name': 'Music'
    },
    {
      'id': 9648,
      'name': 'Mystery'
    },
    {
      'id': 10749,
      'name': 'Romance'
    },
    {
      'id': 878,
      'name': 'Science Fiction'
    },
    {
      'id': 10770,
      'name': 'TV Movie'
    },
    {
      'id': 53,
      'name': 'Thriller'
    },
    {
      'id': 10752,
      'name': 'War'
    },
    {
      'id': 37,
      'name': 'Western'
    }
  ];

  constructor(
    private movieService: MovieService
  ) {
  }

  ngOnInit() {

    const s = this.getGenreString();
    this.addMovies(s, 1);

  }

  addMovies(genres, page) {

    this.moviesLoaded = false;

    if (page === 1) {
      for (let i = 0; i < this.movies.length; i++) {
        this.movies[i]['image'] = '/assets/images/placeholder-poster.png';
        this.movies[i]['image_mobile'] = '/assets/images/placeholder-poster.png';
        this.movies[i]['loaded'] = false;
      }
    }

    this.movieService.getDiscover(this.sort, this.year, genres, page).subscribe(data => {

      if (page === 1) {
        this.movies = data['results'];
        this.totalResults = data['total_results'];
      } else {
        this.movies = this.movies.concat(data['results']);
      }

      for (let i = 0; i < this.movies.length; i++) {
        this.movies[i]['image'] = 'https://image.tmdb.org/t/p/w342' + this.movies[i]['poster_path'];
        this.movies[i]['image_mobile'] = 'https://image.tmdb.org/t/p/w780' + this.movies[i]['backdrop_path'];
        this.movies[i]['loaded'] = true;
      }

      this.moviesLoaded = true;
      this.loadingList = false;

    });

  }

  getGenreString() {
    let string = '';

    for (let i = 0; i < this.selectedGenres.length; i++) {
      string += this.selectedGenres[i]['id'];

      if (i < this.selectedGenres.length - 1) {
        string += ',';
      }
    }

    return string;
  }

  filtersChanged(event) {

    this.loadingList = true;
    this.movies = [];

    if (event['name']) {
      let delay = 0;
      if (this.selectedGenres.length === 0) {
        delay = 50;
      }
      setTimeout(() => {
        this.selectedGenres.push(event);
        const s = this.getGenreString();
        this.addMovies(s, 1);
      }, delay);

    } else {
      if (event['type'] === 'year') {
        this.year = event['value'];
      } else if (event['type'] === 'sort') {
        this.sort = event['value'];
      }

      const s = this.getGenreString();
      this.addMovies(s, 1);
    }

  }

  addMoreMovie(value) {
    const s = this.getGenreString();
    this.addMovies(s, value);
  }

}
