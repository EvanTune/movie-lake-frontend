import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private httpClient: HttpClient) { }

  getTv(id) {
    return this.httpClient.
    get(environment.api_path + 'tv/' + id);
  }

  getTvImages(id) {
    return this.httpClient.
    get(environment.api_path + 'tv/' + id + '/images');
  }

  getTvVideos(id) {
    return this.httpClient.
    get(environment.api_path + 'tv/' + id + '/videos');
  }

  getTvCredits(id) {
    return this.httpClient.
    get(environment.api_path + 'tv/' + id + '/credits');
  }

  getTvSeason(id, id2) {
    return this.httpClient.
    get(environment.api_path + 'tv/' + id + '/season/' + id2);
  }

  getTvEpisode(id, id2, id3) {
    return this.httpClient.
    get(environment.api_path + 'tv/' + id + '/season/' + id2 + '/episode/' + id3);
  }

}
