import { Component, OnInit } from '@angular/core';
import { TvService } from '../tv.service';
import {ActivatedRoute} from '@angular/router';
import { getLangugaeFromIso } from '../helpers/language';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  images = [];
  videos = [];
  tv = {};
  seasons = [];
  id = 0;
  cast = [];
  crew = [];

  tvLoaded = false;

  constructor(
    private tvService: TvService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(val => {

      this.tvLoaded = false;
      this.id = val.id;

      this.setupTv();
      this.setupImages();
      this.setupVideos();
      this.setupTvCredits();
    });
  }

  ngOnInit() {


  }

  roundToNearestInt(number) {
    return Math.round(number);
  }

  getlanguage(iso) {
    return getLangugaeFromIso(iso)
  }

  setupTv() {

    this.tv = {
      'poster_path': '/assets/images/placeholder-poster.png'
    };

    this.tvService.getTv(this.id).subscribe(data => {
      this.tv = data;
      this.tv['poster_path'] = 'https://image.tmdb.org/t/p/w300' + this.tv['poster_path'];
      this.tv['backdrop_path'] = 'https://image.tmdb.org/t/p/w1280' + this.tv['backdrop_path'];
      this.seasons = data['seasons'];
      console.log(data);
      this.tvLoaded = true;
    });

  }

  setupImages() {
    this.tvService.getTvImages(this.id).subscribe(data => {
      this.images = data['backdrops'];
      console.log(data);
    });
  }

  setupTvCredits() {
    this.tvService.getTvCredits(this.id).subscribe(data => {
      this.crew = data['crew'];
      this.cast = data['cast'];
      console.log(data);
    });
  }

  setupVideos() {
    this.tvService.getTvVideos(this.id).subscribe(data => {
      console.log(data);
    });
  }

  getGenres() {
    let genres = '';
    for (let i = 0; i < this.tv['genres'].length; i++) {
      if (i > 2) {
        break;
      }
      genres += this.tv['genres'][i].name;

      if (i < 2) {
        genres += ', ';
      }

    }
    return genres;
  }

}
