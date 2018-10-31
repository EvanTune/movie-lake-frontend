import { Component, OnInit } from '@angular/core';
import { TvService } from '../../_services/tv.service';
import {ActivatedRoute, Router} from '@angular/router';
import { getLangugaeFromIso } from '../../_helpers/language';
import {getScoreColorFromScore} from '../../_helpers/score';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  images: object[] = [];
  tv: object = {};
  seasons: object[] = [];
  id: number = 0;
  cast: object[] = [];
  crew: object[] = [];

  tvLoaded: boolean;
  getScoreColorFromScore = getScoreColorFromScore;

  constructor(
    private tvService: TvService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe(val => {

      this.tvLoaded = false;
      this.id = val.id;

      this.setupTv();
      this.setupImages();
      this.setupTvCredits();
    });
  }

  ngOnInit() {}

  getlanguage(iso: string): string {
    return getLangugaeFromIso(iso);
  }

  setupTv(): void {

    this.tv = {
      'poster_path': '/assets/images/placeholder-poster.png',
      'backdrop_path': '/assets/images/placeholder-poster.png'
    };

    this.tvService.getTv(this.id).subscribe(data => {
      if (data['status_code'] && data['status_code'] === 34) {
        this.router.navigate(['/404']);
      }

      this.tv = data;
      this.tv['poster_path'] = 'https://image.tmdb.org/t/p/w300' + this.tv['poster_path'];
      this.tv['backdrop_path'] = 'https://image.tmdb.org/t/p/w1280' + this.tv['backdrop_path'];
      this.seasons = data['seasons'];
      this.tvLoaded = true;
    }, error => {
      this.router.navigate(['/404']);
    });

  }

  setupImages(): void {
    this.tvService.getTvImages(this.id).subscribe(data => {
      if (data['status_code'] && data['status_code'] === 34) {
       return;
      }
      this.images = data['backdrops'];
    });
  }

  setupTvCredits(): void {
    this.tvService.getTvCredits(this.id).subscribe(data => {
      if (data['status_code'] && data['status_code'] === 34) {
        return;
      }

      this.crew = data['crew'];
      this.cast = data['cast'];
    });
  }



  getGenres(): string {
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
