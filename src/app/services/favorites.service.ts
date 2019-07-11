import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';
import { ActivitiesService } from './activities.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesId = ['a1', 'a3'];
  private _favorites = [];

  constructor(private activitiesService: ActivitiesService) { 
    this.loadFavorites();
  }

  get bookings() {
    return [...this._favorites];
  }

  getBooking(id: string) {
    return {...this._favorites.find(p => p.id === id)};
  }

  loadFavorites() {
    this._favorites = this.activitiesService.getActivities().filter((item) => {
      return this.favoritesId.includes(item.id);
    });
  }

  checkIfFavorite(id: string) {
    console.log(id + ': ' + this.favoritesId.includes(id));
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
