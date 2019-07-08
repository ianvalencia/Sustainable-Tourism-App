import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  categories: Category[] = [
    {
      imageUrl: 'assets/img/bikepacking.jpg',
      categoryName: 'BIKE PACKING'
    },
    {
      imageUrl: 'assets/img/mountaineering.jpg',
      categoryName: 'MOUNTAINEERING'
    },
    {
      imageUrl: 'assets/img/skindiving.jpg',
      categoryName: 'SKIN DIVING'
    },
    {
      imageUrl: 'assets/img/dayhiking.jpg',
      categoryName: 'DAY HIKING'
    },
    {
      imageUrl: 'assets/img/birdwatching.jpg',
      categoryName: 'BIRDING'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
