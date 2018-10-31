import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  @Input() title: string;
  @Input() color: string;
  @Input() route: string;
  @Input() sort: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToRoute() {
    this.router.navigate([this.route], {queryParams: {sort: this.sort}});
  }

}
