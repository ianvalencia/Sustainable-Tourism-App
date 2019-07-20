import { Component, OnInit, OnDestroy } from "@angular/core";

import { BookingsService } from "src/app/services/bookings.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"]
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings = [];
  private bookingsSub: Subscription;
  isLoading = true;

  constructor(private bookingsService: BookingsService) {}

  public isBookingsEmpty() {
    if (this.bookings.length === 0) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.bookingsSub = this.bookingsService.bookings.subscribe(bookings => {
      this.bookings = bookings;
      this.isLoading = false;
    });
  }

  ionViewDidEnter() {
    this.isLoading = true;
    this.bookingsService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  segmentChanged(ev: any) {
    console.log(ev.detail);
  }
}
