import { Injectable } from '@angular/core';

import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private _activities: Activity[] = [
    {
      id: 'a1',
      name: 'Mount Something Hiking',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Hiking',
      imgUrl: 'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg'
    },
    {
      id: 'a2',
      name: 'Skin Diving in Somewhere',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Skin Diving',
      imgUrl: 'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg'
    },
    {
      id: 'a3',
      name: 'Birding in UP',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Birding',
      imgUrl: 'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg'
    },
    {
      id: 'a4',
      name: 'Bike Packing to Marikina',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Bike Packing',
      imgUrl: 'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg'
    },
  ];

  constructor() { }

  get activities() {
    return [...this._activities];
  }
}
