import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('move') move: ElementRef;

  constructor() {}

  ngOnInit() {

    let count = 0;
    let right = true;

    setInterval(() => {
      if (right) {
        count += 2;
        this.move.nativeElement.style.marginLeft = count + 'px';
        if (count > 900) {
          right = false;
        }
      } else {
        count -= 2;
        this.move.nativeElement.style.marginLeft = count + 'px';
        if (count <= 0) {
          right = true;
        }
      }
    }, 16);

  }


}

