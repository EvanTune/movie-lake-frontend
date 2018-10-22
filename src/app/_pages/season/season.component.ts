import {Component, OnInit} from '@angular/core';
import {TvService} from '../../_services/tv.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {

  tvId: number = 0;
  seasonId: number = 0;
  season: object = {};
  tv: object = {};

  seasonLoaded: boolean;
  tvLoaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService
  ) {}

  ngOnInit() {
    this.tvId = this.route.snapshot.params['id'];
    this.seasonId = this.route.snapshot.params['id2'];

    this.setupSeason();
    this.setupTv();
  }

  setupTv(): void {

    this.season['episodes'] = [{}, {}, {}, {}, {}, {}];
    this.tv['backdrop_path'] = '/assets/images/placeholder-poster.png';

    this.tvService.getTv(this.tvId).subscribe(data => {
      this.tv = data;
      this.tv['backdrop_path'] = 'https://image.tmdb.org/t/p/w1280' + this.tv['backdrop_path'];
      this.tvLoaded = true;
    });
  }

  setupSeason(): void {

    this.tvService.getTvSeason(this.tvId, this.seasonId).subscribe(data => {
      this.season = data;
      this.seasonLoaded = true;
    });

  }

}
