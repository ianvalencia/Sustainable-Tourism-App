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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et imperdiet nulla, sit amet posuere erat. Maecenas interdum magna sed consequat eleifend. Praesent mattis justo eu felis fermentum, nec ultrices orci commodo. Maecenas ut eleifend ante. Pellentesque at dui non dui ornare venenatis. Duis non sapien leo. Nulla viverra nibh elit, quis porta sem aliquet nec. Sed sem eros, iaculis ac neque eu, sagittis luctus massa. Aenean hendrerit quis ligula eget dictum. Aenean lacus diam, lacinia nec turpis ut, bibendum elementum dui. Etiam id porta metus, sed posuere libero. Fusce hendrerit vestibulum sapien, at volutpat eros ultricies vel. Integer sollicitudin sem at urna malesuada efficitur. Nullam finibus mauris odio. Sed lobortis justo ac urna blandit vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      location: 'Philippines',
      activityType: 'Hiking',
      imgUrl: 'https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg',
      rating: 5.0
    },
    // {
    //   id: 'a2',
    //   name: 'Skin Diving in Somewhere',
    //   provider: 'Bridge360',
    //   price: 1500,
    //   description: 'Lorem Ipsum hehe',
    //   location: 'Philippines',
    //   activityType: 'Skin Diving',
    //   imgUrl: 'https://www.divein.com/wp-content/uploads/image-archive/img/skin-diving-on-reef.jpg',
    //   rating: 5.0
    // },
    // {
    //   id: 'a3',
    //   name: 'Birding in UP',
    //   provider: 'Bridge360',
    //   price: 1500,
    //   description: 'Lorem Ipsum hehe',
    //   location: 'Philippines',
    //   activityType: 'Birding',
    //   imgUrl: 'https://www.audubon.org/sites/default/files/web_strawberry-plain_camillacerea-1-of-1.jpg',
    //   rating: 5.0
    // },
    // {
    //   id: 'a4',
    //   name: 'Bike Packing to Marikina',
    //   provider: 'Bridge360',
    //   price: 1500,
    //   description: 'Lorem Ipsum hehe',
    //   location: 'Philippines',
    //   activityType: 'Bike Packing',
    //   imgUrl: 'https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/StandardImage/Ortlieb-4.jpg',
    //   rating: 5.0
    // },
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
