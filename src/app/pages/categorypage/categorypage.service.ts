import { Injectable } from '@angular/core';

import { Activity } from './activity.model';

@Injectable({
  providedIn: 'root'
})
export class CategorypageService {
  private activities: Activity[] = [
    {
      id: 'bp1',
      title: 'Bike Activity 1',
      imageUrl: 'assets/img/bikepacking.jpg',
      details: ['Mondays','10AM','Meeting Address']
    },
    {
      id: 'bp2',
      title: 'Bike Activity 2',
      imageUrl: 'assets/img/bikepacking.jpg',
      details: ['Everyday','7AM','Meeting Address']
    },
    {
      id: 'bp3',
      title: 'Bike Activity 3',
      imageUrl: 'assets/img/bikepacking.jpg',
      details: ['Weekends','11AM','Meeting Address']
    },
    {
      id: 'bp4',
      title: 'Bike Activity 4',
      imageUrl: 'assets/img/bikepacking.jpg',
      details: ['Saturdays','1PM','Meeting Address']
    },
    {
      id: 'bp5',
      title: 'Bike Activity 5',
      imageUrl: 'assets/img/bikepacking.jpg',
      details: ['Wednesdays','12NN','Meeting Address']
    },
  ];

  constructor() { }

  getAllActivites() {
    return [...this.activities];
  }

  getActivity(actId: string) {
    return {
      ...this.activities.find(activity => {
        return activity.id === actId;
    })
  };
  }
}
