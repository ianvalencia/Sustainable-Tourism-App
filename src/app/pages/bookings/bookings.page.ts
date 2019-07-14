import { Component, OnInit } from '@angular/core';

import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings = [];

  constructor(private bookingsService: BookingsService) { }

  public isBookingsEmpty() {
    if (this.bookings.length === 0) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.bookings = this.bookingsService.bookings;
  }

  segmentChanged(ev: any) {
    console.log(ev.detail);
  }
}
