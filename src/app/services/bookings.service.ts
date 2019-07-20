import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Booking } from '../interfaces/booking';
import { take, tap, delay, map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor() { }

  get bookings() {
    return this._bookings.asObservable();
  }

  getBooking(id: string) {
    return this.bookings.pipe(
      take(1),
      map((bookings) => {
        return {
          ...bookings.find(b => b.id === id)
        };
      })
    );
  }

  addBooking(
    ownerId: string,
    actId: string,
    bookingDate: Date,
    quantity: number,
    total: number,
    name: string,
    contactNumber: string,
    email: string
  ) {
    const newBooking = new Booking(
      Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      ownerId,
      actId,
      bookingDate,
      quantity,
      total,
      {
        name,
        contactNumber,
        email
      },
      'payment'
    );
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        this._bookings.next(bookings.concat(newBooking));
      })
    );

  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        this._bookings.next(bookings.filter(b => b.id !== bookingId));
      })
    );
  }
}
