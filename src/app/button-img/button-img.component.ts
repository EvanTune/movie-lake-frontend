import { Component, OnInit, Input  } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-button-img',
  templateUrl: './button-img.component.html',
  styleUrls: ['./button-img.component.scss']
})
export class ButtonImgComponent implements OnInit {

  @Input() color: string;
  @Input() text: string;
  @Input() image: string;
  @Input() route: string;
  @Input() params: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToRoute() {
    this.router.navigate([this.route], {queryParams: {sort: 'vote_average.desc'}});
  }

}
