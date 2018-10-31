import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../_services/movie.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {

  @Input() items;
  @Input() itemsLoaded;
  @Input() type;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {

  }

  truncateTitle(title: string) {

    const width = window.innerWidth;

    if (width >= 1200) {
      if (title.length > 40) {
        return title.substr(0, 40) + '...';
      } else {
        return title;
      }
    } else {
      if (title.length > 30) {
        return title.substr(0, 30) + '...';
      } else {
        return title;
      }
    }

  }

}
