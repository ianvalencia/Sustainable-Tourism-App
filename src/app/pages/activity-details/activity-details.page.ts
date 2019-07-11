import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/interfaces/activity';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {
  loadedActivity: Activity;

  constructor(private activatedRoute: ActivatedRoute, private ActService: ActivitiesService, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        // redirect
        return;
      }
      const actId = paramMap.get('id');
      this.loadedActivity = this.ActService.getActivity(actId);
    });
  }

  onToggleFavorite() {
    this.favoritesService.toggleFavorite(this.loadedActivity.id);
    this.favoritesService.loadFavorites();
  }

  onFavorite() {
    return this.favoritesService.checkIfFavorite(this.loadedActivity.id);
  }

}
