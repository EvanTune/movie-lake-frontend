import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  getPopularPeople() {
    return this.httpClient.
    get(environment.api_path + 'people/popular');
  }

  getPerson(id) {
    return this.httpClient.
    get(environment.api_path + 'person/' + id);
  }

}
