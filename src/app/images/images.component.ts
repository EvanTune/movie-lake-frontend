import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  animations: [
    trigger('fade', [
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
        opacity: '0'
      })),
      transition('show => hide', [
        animate('0.3s ease-out')
      ]),
      transition('hide => show', [
        animate('0.3s ease-in')
      ])
    ]),
    trigger('slideBody', [
      state('show', style({
        height: '100%'
      })),
      state('hide', style({
        height: '0'
      })),
      transition('show => hide', [
        animate('0.6s ease-in-out')
      ]),
      transition('hide => show', [
        animate('0.6s ease-in-out')
      ])
    ]),
  ]
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
  showOverlay: boolean;
  showModal: boolean;
  showContent: boolean;

  constructor() { }

  ngOnInit() {}

  openImageModal(index) {
    this.showOverlay = true;

    setTimeout(() => {
      this.showModal = true;
    }, 400);
    setTimeout(() => {
      this.showContent = true;
      this.modal.nativeElement.style.pointerEvents = 'auto';
    }, 900);
    this.modal.nativeElement.style.display = 'block';
    this.position = index;
    this.setScrollbarPosition();
  }

  exitImageModal() {
    this.showContent = false;

    setTimeout(() => {
      this.showModal = false;
    }, 300);
    setTimeout(() => {
      this.showOverlay = false;
    }, 800);
    setTimeout(() => {
      this.modal.nativeElement.style.display = 'none';
      this.modal.nativeElement.style.pointerEvents = 'none';
    }, 1100);

  }

  stopBodyProp(e) {
    e.stopPropagation();
  }

  prevImage(e) {
    if (this.position !== 0) {
      this.position--;
      this.setScrollbarPosition();
    }
  }

  nextImage(e) {
    if (this.position < this.images.length - 1 && this.position < 11) {
      this.position++;
      this.setScrollbarPosition();
    }
  }

  setScrollbarPosition() {
    const width = this.imgContainer.nativeElement.offsetWidth;
    this.imgContainer.nativeElement.scrollLeft = this.position * width;
  }

  setOffset(e) {
    if (!this.scrolling) {
      const screenWidth = e['center'];
      this.currentOffset = this.imagesEl.nativeElement.scrollLeft;
      this.last = e['center'].x;

    }
  }

  panRight(e) {
    if (!this.scrolling) {
      this.imagesEl.nativeElement.scrollLeft = this.last - e['center'].x + this.currentOffset;
    }
  }

  panLeft(e) {
    if (!this.scrolling) {
      this.imagesEl.nativeElement.scrollLeft = this.last - e['center'].x + this.currentOffset;
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
