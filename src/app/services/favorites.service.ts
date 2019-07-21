import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Activity } from '../interfaces/activity';
import { ActivitiesService } from './activities.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesId: string[] = [];
  private _favorites = [];
  private activitiesSub: Subscription;
  private activities = [];

  constructor(
    private activitiesService: ActivitiesService
  ) {
    
  }


  get favorites() {
    return [...this._favorites];
  }

  loadFavorites() {
    this._favorites = this.favoritesId.map(id => {
      return this.activities.find(p => p.id === id);
    });
  }

  checkIfFavorite(id: string) {
    return this.favoritesId.includes(id);
  }

  toggleFavorite(id: string) {
    if (this.checkIfFavorite(id)) {
      this.favoritesId = this.favoritesId.filter(item => item !== id);
    } else {
      this.favoritesId.push(id);
    }
  }
}
