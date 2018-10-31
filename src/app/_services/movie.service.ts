import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private httpClient: HttpClient) {
  }

  getPopularMovies() {
    return this.httpClient.get(environment.api_path + 'movies/popular');
  }

  getUpcomingMovies() {
    return this.httpClient.get(environment.api_path + 'movies/upcoming');
  }

  getTheatresMovies(page) {
    return this.httpClient.get(environment.api_path + 'movies/theatres?page=' + page);
  }

  getTopMovies() {
    return this.httpClient.get(environment.api_path + 'movies/top');
  }

  getMovie(id) {
    return this.httpClient.get(environment.api_path + 'movie/' + id);
  }

  getMovieCredits(id) {
    return this.httpClient.get(environment.api_path + 'movie/' + id + '/credits');
  }

  getMovieVideos(id) {
    return this.httpClient.get(environment.api_path + 'movie/' + id + '/videos');
  }

  getMovieImages(id) {
    return this.httpClient.get(environment.api_path + 'movie/' + id + '/images');
  }

  getDiscover(sort, year, genres, page, date_greater_than, date_less_than) {

    if (date_greater_than && date_less_than) {
      return this.httpClient.get(environment.api_path + 'discover/movie?sort=' + sort + '&year=' + year + '&genres=' + genres + '&page=' + page + '&date_greater_than=' + date_greater_than + '&date_less_than=' + date_less_than);
    } else {
      console.log('gggg');
      return this.httpClient.get(environment.api_path + 'discover/movie?sort=' + sort + '&year=' + year + '&genres=' + genres + '&page=' + page);
    }


  }

  getSearchMulti(query, page) {
    return this.httpClient.get(environment.api_path + 'search/multi?query=' + query + '&page=' + page);
  }

  getSearch(query, page) {
    return this.httpClient.get(environment.api_path + 'search/movie?query=' + query + '&page=' + page);
  }

}
