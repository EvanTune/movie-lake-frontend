import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getPopularMovies() {
    return this.httpClient.
    get(environment.api_path + 'movies/popular');
  }

  getUpcomingMovies() {
    return this.httpClient.
    get(environment.api_path + 'movies/upcoming');
  }

  getTheatresMovies() {
    return this.httpClient.
    get(environment.api_path + 'movies/theatres');
  }

  getMovie(id) {
    return this.httpClient.
    get(environment.api_path + 'movie/' + id);
  }

  getMovieCredits(id) {
    return this.httpClient.
    get(environment.api_path + 'movie/' + id + '/credits');
  }

  getMovieVideos(id) {
    return this.httpClient.
    get(environment.api_path + 'movie/' + id + '/videos');
  }

  getMovieImages(id) {
    return this.httpClient.
    get(environment.api_path + 'movie/' + id + '/images');
  }

  getSearch(query) {
    return this.httpClient.
    get(environment.api_path + 'search?query=' + query);
  }

}
