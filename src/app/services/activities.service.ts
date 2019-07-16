import { Injectable } from '@angular/core';

import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private _activities = [
    {
      id: 'a1',
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
      id: 'a2',
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
    {
      id: 'a3',
      name: 'Birding in UP',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Birding',
      imgUrl: 'https://www.audubon.org/sites/default/files/web_strawberry-plain_camillacerea-1-of-1.jpg',
      rating: 5.0,
      contactDetails: '09123456789',
      schedule: 'July 24-26, 2019',
      capacity: 50,
      claimed: 22
    },
    {
      id: 'a4',
      name: 'Bike Packing to Marikina',
      provider: 'Bridge360',
      price: 1500,
      description: 'Lorem Ipsum hehe',
      location: 'Philippines',
      activityType: 'Bike Packing',
      imgUrl: 'https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/StandardImage/Ortlieb-4.jpg',
      rating: 5.0,
      contactDetails: '09123456789',
      schedule: 'July 24-26, 2019',
      capacity: 50,
      claimed: 22
    },
  ];

  constructor() { }

  getActivities() {
    return [...this._activities];
  }

  getActivity(actId: string) {
    return {
      ...this._activities.find(activity => {
        return activity.id === actId;
    })};
  }
}
