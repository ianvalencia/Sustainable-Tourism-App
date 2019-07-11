import { Injectable } from '@angular/core';

import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private _bookings = [
    {
      id: 'b2',
      name: 'Skin Diving in Somewhere',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Skin Diving',
      imgUrl: 'https://www.divein.com/wp-content/uploads/image-archive/img/skin-diving-on-reef.jpg',
      rating: 5.0
    },
  ];

  constructor() { }

  get bookings() {
    return [...this._bookings]
  }

  getBooking(id: string) {
    return {...this._bookings.find(p => p.id === id)};
  }
}
