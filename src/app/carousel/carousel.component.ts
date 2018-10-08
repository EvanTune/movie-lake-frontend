import {Component, ElementRef, HostListener, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MOVIES } from '../mock-movies';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ViewChild('carousel') carouselElement: ElementRef;

  movies = MOVIES;
  currentPosition = 0;
  windowWidth = 0;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setWindowWidth();
    this.setScrollLeft();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setWindowWidth();
    this.setScrollLeft();
  }

  next(e) {
    this.currentPosition++;
    this.carouselElement.nativeElement.scrollLeft += this.windowWidth;
    console.log(this.windowWidth);
  }

  prev(e) {
    this.currentPosition--;
    this.carouselElement.nativeElement.scrollLeft -= this.windowWidth;
  }

  setWindowWidth() {
    this.windowWidth = document.body.clientWidth;
  }

  setScrollLeft() {
    this.carouselElement.nativeElement.scrollLeft = this.windowWidth * this.currentPosition;
  }

}
