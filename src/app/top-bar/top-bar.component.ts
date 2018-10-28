import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  path: string;

  constructor(
    private router: Router
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.path = window.location.pathname;
      }
    });
  }

  ngOnInit() {}

}
