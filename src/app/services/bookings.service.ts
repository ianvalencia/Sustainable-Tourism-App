import { Injectable } from '@angular/core';

import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private _bookings = [
    {
      id: 'b1',
      name: 'Mount Something Hiking',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue hendrerit lectus, id varius erat pellentesque ac. Morbi ultrices, ipsum ac pretium efficitur, enim dolor consectetur nisl, sed egestas lacus elit non justo. Donec sodales diam lectus, sed iaculis ligula tempus nec. Quisque vitae pulvinar diam, sit amet ultricies orci. In porta augue lacus, luctus sodales odio egestas eu. Vestibulum.',
      location: 'Philippines',
      activityType: 'Hiking',
      imgUrl: 'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg',
      rating: 5.0,
      contactDetails: '09123456789',
      schedule: 'July 24-26, 2019',
      capacity: 50,
      claimed: 22
    },
    {
      id: 'b2',
      name: 'Skin Diving in Somewhere',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Skin Diving',
      imgUrl: 'https://www.divein.com/wp-content/uploads/image-archive/img/skin-diving-on-reef.jpg',
      rating: 5.0,
      contactDetails: '09123456789',
      schedule: 'July 24-26, 2019',
      capacity: 50,
      claimed: 22
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
