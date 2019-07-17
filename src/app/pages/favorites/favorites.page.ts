import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favorites = this.favoritesService.bookings;
  }

  ionViewWillEnter() {
    this.favorites = this.favoritesService.bookings;
  }
}
