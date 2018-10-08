import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  @Input() title: string;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}
