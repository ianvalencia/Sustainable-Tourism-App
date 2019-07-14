import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {
  @Input() booking;
  maxNameLength = 30;

  constructor() { }

  ngOnInit() {}

}
