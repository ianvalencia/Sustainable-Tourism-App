import { Component, OnInit } from '@angular/core';

import { Activity } from 'src/app/interfaces/activity';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites;
  private activitiesSub: Subscription;
  private favoritesSub: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.favorites = this.favoritesService.favorites;
  }

  ionViewWillEnter() {
    this.favorites = this.favoritesService.favorites;
  }
}
