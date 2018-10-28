import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {

  @Input() type;
  images = {
    'Tv Shows': ['/assets/images/tv-header.jpg', '35%'],
    'Movies': ['/assets/images/movies-header.jpg', '32%']
  };

  constructor() { }

  ngOnInit() {
  }

}
