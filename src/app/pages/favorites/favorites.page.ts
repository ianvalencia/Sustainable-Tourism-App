import { Component, OnInit, OnDestroy } from '@angular/core';

import { Activity } from 'src/app/interfaces/activity';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit, OnDestroy {
  favorites: Activity[];
  private activitiesSub: Subscription;
  private favoritesSub: Subscription;

  constructor(
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.activitiesSub = this.activitiesService.favorites.subscribe(activities => {
      this.favorites = activities;
    });
  }

  ngOnDestroy() {
    if (this.activitiesSub) {
      this.activitiesSub.unsubscribe();
    }
  }
}
