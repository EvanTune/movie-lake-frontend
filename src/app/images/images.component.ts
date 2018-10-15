import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  @Input() images;
  @ViewChild('imgContainer') imgContainer: ElementRef;
  @ViewChild('imgElement') imagesEl: ElementRef;
  @ViewChild('modal') modal: ElementRef;
  position = 0;
  @Input() width;

  currentOffset = 0;
  last = 0;
  acceleration = 0;
  panInterval: any = null;
  scrolling = false;

  constructor() { }

  ngOnInit() {}

  openImageModal(index) {
    this.modal.nativeElement.style.display = 'block';
    console.log('open');
    this.position = index;
    this.setScrollbarPosition();
  }

  stopBodyProp(e) {
    e.stopPropagation();
  }

  prevImage(e) {
    console.log('right');
    if (this.position !== 0) {
      this.position--;
      this.setScrollbarPosition();
    }
  }

  nextImage(e) {
    if (this.position < this.images.length - 1) {
      this.position++;
      console.log('left');
      this.setScrollbarPosition();
    }
  }

  setScrollbarPosition() {
    const width = this.imgContainer.nativeElement.offsetWidth;
    console.log(width);
    this.imgContainer.nativeElement.scrollLeft = this.position * width;
  }

  exitImageModal() {
    this.modal.nativeElement.style.display = 'none';
    console.log('exit');
  }

  setOffset(e) {
    if (!this.scrolling) {
      let screenWidth = e['center'];
      this.currentOffset = this.imagesEl.nativeElement.scrollLeft;
      this.last = e['center'].x;

    }
  }

  panRight(e) {
    console.log(this.scrolling);
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.imagesEl.nativeElement.scrollLeft = a;
    }
  }

  panLeft(e) {
    if (!this.scrolling) {
      let a = this.last - e['center'].x + this.currentOffset;
      this.imagesEl.nativeElement.scrollLeft = a;
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

          this.imagesEl.nativeElement.scrollLeft -= this.acceleration;

          if (this.imagesEl.nativeElement.scrollLeft <= 0) {
            this.acceleration = 0;
          } else {
            this.acceleration--;
          }

        } else if (this.acceleration < 0) {

          this.imagesEl.nativeElement.scrollLeft -= this.acceleration;

          if (this.imagesEl.nativeElement.scrollLeft >= this.imagesEl.nativeElement.scrollWidth - this.imagesEl.nativeElement.clientWidth) {
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
