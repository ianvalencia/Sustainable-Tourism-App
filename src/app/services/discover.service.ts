import { Injectable } from '@angular/core';

import { Category } from 'src/app/interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  private categories: Category[] = [
    {
      id: 'bp',
      imageUrl: 'assets/img/bikepacking.jpg',
      categoryName: 'BIKE PACKING'
    },
    {
      id: 'mt',
      imageUrl: 'assets/img/mountaineering.jpg',
      categoryName: 'MOUNTAINEERING'
    },
    {
      id: 'sd',
      imageUrl: 'assets/img/skindiving.jpg',
      categoryName: 'SKIN DIVING'
    },
    {
      id: 'dh',
      imageUrl: 'assets/img/dayhiking.jpg',
      categoryName: 'DAY HIKING'
    },
    {
      id: 'bd',
      imageUrl: 'assets/img/birdwatching.jpg',
      categoryName: 'BIRDING'
    },
  ];
  constructor() { }

  getAllCategories() {
    return [...this.categories];
  }

  getCategory(categoryId: string) {
    return {
      ...this.categories.find(category => {
        return category.id === categoryId;
    })
  };
  }
}
