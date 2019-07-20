import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Booking } from "../interfaces/booking";
import { take, tap, delay, map, switchMap } from "rxjs/operators";
import { UserService } from "../user.service";

interface BookingData {
  actId: string;
  bookingDate: string;
  contactPerson: {
    contactNumber: string;
    email: string;
    name: string;
  };
  ownerId: string;
  quantity: number;
  status: string;
  total: number;
}

@Injectable({
  providedIn: "root"
})
export class BookingsService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private userService: UserService, private http: HttpClient) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  getBooking(id: string) {
    // return this.bookings.pipe(
    //   take(1),
    //   map(bookings => {
    //     return {
    //       ...bookings.find(b => b.id === id)
    //     };
    //   })
    // );

    return this.http
      .get<BookingData>(
        `https://sustainable-tourism-bridge360.firebaseio.com/bookings/${id}.json`
      )
      .pipe(
        map(bookingData => {
          return new Booking(
            id,
            bookingData.ownerId,
            bookingData.actId,
            new Date(bookingData.bookingDate),
            bookingData.quantity,
            bookingData.total,
            bookingData.contactPerson,
            bookingData.status
          );
        })
      );
  }

  addBooking(
    actId: string,
    bookingDate: Date,
    quantity: number,
    total: number,
    name: string,
    contactNumber: string,
    email: string
  ) {
    let generatedId;
    const newBooking = new Booking(
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 8),
      this.userService.User.id,
      actId,
      bookingDate,
      quantity,
      total,
      {
        name,
        contactNumber,
        email
      },
      "payment"
    );
    return this.http
      .post<{ name: string }>(
        "https://sustainable-tourism-bridge360.firebaseio.com/bookings.json",
        { ...newBooking, id: null }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          newBooking.id = generatedId;
          this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(bookingId: string) {
    return this.http
      .delete(
        `https://sustainable-tourism-bridge360.firebaseio.com/bookings/${bookingId}.json`
      )
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          this._bookings.next(bookings.filter(b => b.id !== bookingId));
        })
      );
  }

  fetchBookings() {
    return this.http
      .get<{ [key: string]: BookingData }>(
        `https://sustainable-tourism-bridge360.firebaseio.com/bookings.json?orderBy="ownerId"&equalTo="${
          this.userService.User.id
        }"`
      )
      .pipe(
        map(bookingData => {
          const bookings = [];
          for (const key in bookingData) {
            if (bookingData.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  bookingData[key].ownerId,
                  bookingData[key].actId,
                  new Date(bookingData[key].bookingDate),
                  bookingData[key].quantity,
                  bookingData[key].total,
                  bookingData[key].contactPerson,
                  bookingData[key].status
                )
              );
            }
          }
          return bookings;
        }),
        tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }
}
