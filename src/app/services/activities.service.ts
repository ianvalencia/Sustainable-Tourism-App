import { Injectable } from '@angular/core';

import { Activity } from '../interfaces/activity';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private _activities = [
    new Activity(
      'a1',
      'Mount Something Hiking',
      'Hiking',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue hendrerit lectus, id varius erat pellentesque ac. Morbi ultrices, ipsum ac pretium efficitur, enim dolor consectetur nisl, sed egestas lacus elit non justo. Donec sodales diam lectus, sed iaculis ligula tempus nec. Quisque vitae pulvinar diam, sit amet ultricies orci. In porta augue lacus, luctus sodales odio egestas eu. Vestibulum.',
      'Philippines',
      1000,
      'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg',
      '09123456789',
      new Date(),
      new Date(),
      40,
      2,
      {
        id: 'abc',
        name: 'Bridge 360'
      },
      22,
      false
    ),
    new Activity(
      'a2',
      'Ilog Pasig Skin Diving',
      'Skin Diving',
      'Supercalifragilisticespialidocius',
      'Pasig River',
      500,
      'https://www.divein.com/wp-content/uploads/image-archive/img/skin-diving-on-reef.jpg',
      '09123456789',
      new Date(),
      new Date(),
      10,
      1,
      {
        id: 'abc',
        name: 'Bridge 360'
      },
      5,
      false
    ),
    new Activity(
      'a3',
      'Birding in UP',
      'Birding',
      'Class in UP',
      'University of the Philippines Diliman',
      100,
      'https://www.audubon.org/sites/default/files/web_strawberry-plain_camillacerea-1-of-1.jpg',
      '09123456789',
      new Date(),
      new Date(),
      40,
      1,
      {
        id: 'def',
        name: 'Juan Dela Cruz'
      },
      2,
      true
    ),
    new Activity(
      'a4',
      'Biking from Philcoa to Marikina',
      'Bike Packing',
      'Paguran',
      'Philcoa',
      200,
      'https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/StandardImage/Ortlieb-4.jpg',
      '09123456789',
      new Date(),
      new Date(),
      30,
      1,
      {
        id: 'abc',
        name: 'Bridge 360'
      },
      5,
      false
    )
  ];

  constructor(
    private userService: UserService
  ) { }

  getActivities() {
    return [...this._activities];
  }

  getActivity(actId: string) {
    return {
      ...this._activities.find(p => p.id === actId)
    };
  }

  filterBySearch(searchTerm) {
    return this._activities.filter(item => {
      return (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
        (item.location.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
        (item.activityType.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    });
  }

  filterByCategory(category) {
    return this._activities.filter(item => {
      return item.activityType === category;
    });
  }

  getOwnedActivities() {
    return this._activities.filter(item => {
      return item.owner.id === this.userService.User.id;
    });
  }

  addActivity(
    name: string,
    activityType: string,
    description: string,
    location: string,
    price: number,
    imgUrl: string,
    contactDetails: string,
    bookingStart: Date,
    bookingEnd: Date,
    capacity: number,
    duration: number
  ) {
    const newActivity = new Activity(
      Math.random().toString(),
      name,
      activityType,
      description,
      location,
      price,
      imgUrl,
      contactDetails,
      bookingStart,
      bookingEnd,
      capacity,
      duration,
      this.userService.User,
      0,
      false
    );

    this._activities.push(newActivity);
  }
}
