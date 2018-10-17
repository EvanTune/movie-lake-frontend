import {Component, OnInit} from '@angular/core';
import {TvService} from '../tv.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {

  tvId = 0;
  seasonId = 0;
  season = {};
  tv = {};

  seasonLoaded = false;
  tvLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService
  ) {
  }

  ngOnInit() {
    this.tvId = this.route.snapshot.params['id'];
    this.seasonId = this.route.snapshot.params['id2'];

    this.setupSeason();
    this.setupTv();

  }

  setupTv() {

    this.season['episodes'] = [{}, {}, {}, {}, {}, {}];

    this.tvService.getTv(this.tvId).subscribe(data => {
      this.tv = data;
      this.tv['backdrop_path'] = 'https://image.tmdb.org/t/p/w1280' + this.tv['backdrop_path'];
      this.tvLoaded = true;
    });
  }

  setupSeason() {

    this.tvService.getTvSeason(this.tvId, this.seasonId).subscribe(data => {
      this.season = data;
      this.seasonLoaded = true;
      console.log(this.season);
    });

  }

}
