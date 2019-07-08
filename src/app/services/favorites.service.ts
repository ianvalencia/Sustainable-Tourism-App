import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _favorites: Activity[] = [
    {
      id: 'a1',
      name: 'Mount Something Hiking',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Hiking',
      imgUrl: 'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg',
      rating: 5.0
    },
  ];

  constructor() { }

  get bookings() {
    return [...this._favorites];
  }

  getBooking(id: string) {
    return {...this._favorites.find(p => p.id === id)};
  }
}
