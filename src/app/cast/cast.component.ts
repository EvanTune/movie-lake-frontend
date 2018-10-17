import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {

  @Input() cast;
  @Input() crew;

  constructor() { }

  ngOnInit() {
  }

}
