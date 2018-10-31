import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [
    trigger('genre', [
      transition(':enter', [
        style({opacity: 0, marginTop: '-50px'}),
        animate('0.3s ease-out', style({opacity: 1, marginTop: '0px'})),
      ]),
      transition(':leave', [
        style({opacity: 1, marginTop: '0px'}),
        animate('0.3s ease-in', style({opacity: 0, marginTop: '-50px'})),
      ])
    ])
  ]
})
export class FiltersComponent implements OnInit {

  years: number[] = [];
  showGenres: boolean;
  @Input() selectedGenres;
  @Input() allGenres;
  @Input() loadingList;
  @Input() type;
  @Input() year;
  @Input() sort;
  @Output() changedEvent = new EventEmitter();
  @ViewChild('genreSelect') genreSelect: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.setupYearsArray();
  }

  setupYearsArray() {
    let year = 2020;

    while (year > 1950) {
      this.years.push(year);
      year--;
    }
  }

  addGenre(value) {

    let name = '';
    let alreadyAdded = false;
    this.showGenres = true;

    for (let i = 0; i < this.allGenres.length; i++) {
      if (this.allGenres[i]['id'] == value) {
        name = this.allGenres[i]['name'];
      }
    }

    for (let j = 0; j < this.selectedGenres.length; j++) {
      if (value == this.selectedGenres[j]['id']) {
        alreadyAdded = true;
        break;
      }
    }

    this.genreSelect.nativeElement.value = '-1';

    if (!alreadyAdded) {
      this.changedEvent.emit({id: value, name: name});
    }

  }

  removeGenre(id) {

    for (let i = 0; i < this.selectedGenres.length; i++) {
      if (id == this.selectedGenres[i]['id']) {
        this.selectedGenres.splice(i, 1);
        this.changedEvent.emit({});
        if (this.selectedGenres.length === 0) {
          setTimeout(() => {
            this.showGenres = false;
          }, 250);
        }
      }
    }

  }

}
