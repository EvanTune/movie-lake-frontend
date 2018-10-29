import {Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { getScoreColorFromScore } from '../_helpers/score';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('basicFade', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.1s ease-out', style({opacity: 1})),
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('0.1s ease-in', style({opacity: 0})),
      ])
    ]),
    trigger('toTopFade', [
      state('open', style({
        opacity: '1'
      })),
      state('closed', style({
        opacity: '0'
      })),
      transition('open => closed', [
        animate('0.2s ease-out')
      ]),
      transition('closed => open', [
        animate('0.2s ease-in')
      ])
    ]),
  ]
})
export class ListComponent implements OnInit, OnChanges {

  @Input() type;
  @Input() items;
  @Input() itemsLoaded;
  @Input() loadingList;
  @Input() totalResults;
  @Output() newPageEvent = new EventEmitter();
  mobileMode: boolean;
  scrollOffset: number = 0;
  page: number = 1;
  showToTopBtn: boolean;
  getScoreColorFromScore = getScoreColorFromScore;

  // Window scroll event
  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    this.loadItemsWithScroll();
    this.manageToTopBtn();
  }

  constructor() {
  }

  ngOnInit() {
    this.mobileMode = window.innerWidth < 992;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Set page back to 1 when items length are back at 0
    if (changes['items'] && changes['items']['currentValue'].length === 0) {
      this.page = 1;
    }
  }

  loadItemsWithScroll() {

    if (this.mobileMode) {
      if (this.scrollOffset > (this.page * 7500) + 535 + ((this.page - 1) * 1700) &&
        this.page * 20 < this.totalResults && this.page <= 10) {
        this.page++;
        this.newPageEvent.emit(this.page);
      }
    } else {
      if (this.scrollOffset > (this.page * 900) + 395 + ((this.page - 1) * 1450) &&
        this.page * 20 < this.totalResults && this.page <= 10) {
        this.page++;
        this.newPageEvent.emit(this.page);
      }
    }

  }

  truncateText(text: string) {

    if (text.length > 180) {
      return text.substr(0, 180) + '...';
    } else {
      return text.substr(0, 180);
    }

  }

  manageToTopBtn() {
    this.showToTopBtn = this.scrollOffset > 2000;
  }

  scrollToTop() {
    try {
      window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }

}
