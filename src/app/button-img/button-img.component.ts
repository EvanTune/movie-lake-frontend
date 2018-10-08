import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-button-img',
  templateUrl: './button-img.component.html',
  styleUrls: ['./button-img.component.scss']
})
export class ButtonImgComponent implements OnInit {

  @Input() color: string;
  @Input() text: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
