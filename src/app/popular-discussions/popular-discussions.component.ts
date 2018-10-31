import {Component, Input, OnInit} from '@angular/core';
import {MOVIES} from '../mock-movies';
import {truncateText} from '../_helpers/Text';

@Component({
  selector: 'app-popular-discussions',
  templateUrl: './popular-discussions.component.html',
  styleUrls: ['./popular-discussions.component.scss']
})
export class PopularDiscussionsComponent implements OnInit {

  @Input() shows;
  truncateText = truncateText;

  constructor() { }

  ngOnInit() {
  }

}
