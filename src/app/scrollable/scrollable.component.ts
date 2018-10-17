import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss']
})
export class ScrollableComponent implements OnInit {

  canScroll = false;
  contentLoaded = false;
  @Input() items;
  @Input() component;
  @Input() tvId;
  @ViewChild('scrollableElement') scrollableElement: ElementRef;

  actingLength = 20;
  innerWidth = 0;
  currentOffset = 0;
  last = 0;
  acceleration = 0;
  panInterval: any = null;
  scrolling = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navigateToSeason(id) {
    this.router.navigate(['/tv/' + this.tvId + '/season/' + id]);
  }

  setOffset(e) {
    if (!this.canScroll) {
      let screenWidth = e['center'];
      this.currentOffset = this.scrollableElement.nativeElement.scrollLeft;
      this.last = e['center'].x;

    }
  }

  panRight(e) {
    console.log(this.scrolling);
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.scrollableElement.nativeElement.scrollLeft = a;
    }
  }

  panLeft(e) {
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.scrollableElement.nativeElement.scrollLeft = a;
    }
  }

  panEnd(e) {
    if (!this.scrolling) {

      if (Math.abs(e.overallVelocity) > 0.6 && e.distance < 500) {
        this.acceleration = Math.floor(e.overallVelocity * 22);
      } else {
        this.acceleration = 0;
      }

      this.scrolling = true;
      this.panInterval = setInterval(() => {

        if (this.acceleration > 0) {

          this.scrollableElement.nativeElement.scrollLeft -= this.acceleration;

          if (this.scrollableElement.nativeElement.scrollLeft <= 0) {
            this.acceleration = 0;
          } else {
            this.acceleration--;
          }

        } else if (this.acceleration < 0) {

          this.scrollableElement.nativeElement.scrollLeft -= this.acceleration;

          if (this.scrollableElement.nativeElement.scrollLeft >= this.scrollableElement.nativeElement.scrollWidth - this.scrollableElement.nativeElement.clientWidth) {
            this.acceleration = 0;
          } else {
            this.acceleration++;
          }

          this.acceleration++;

        } else {
          clearInterval(this.panInterval);
          this.scrolling = false;

        }

      }, 16);
    }
  }


}
