import {Component, OnInit} from '@angular/core';
import {TvService} from '../../_services/tv.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  tvId: number = 0;
  seasonId: number = 0;
  episodeId: number = 0;
  episode: object = {};
  cast: object[] = [];
  crew: object[] = [];
  episodeLoaded: boolean;

  constructor(
    private tvService: TvService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.tvId = this.route.snapshot.params['id'];
    this.seasonId = this.route.snapshot.params['id2'];
    this.episodeId = this.route.snapshot.params['id3'];

    this.setupEpisode();
  }

  setupEpisode(): void {

    this.tvService.getTvEpisode(this.tvId, this.seasonId, this.episodeId).subscribe(data => {
      this.episode = data;
      this.cast = data['guest_stars'];
      this.crew = data['crew'];
      this.episode['still_path'] = 'https://image.tmdb.org/t/p/w300' + this.episode['still_path'];
      this.episodeLoaded = true;
    });

  }

}
