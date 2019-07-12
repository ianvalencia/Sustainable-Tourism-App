import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Activity } from 'src/app/interfaces/activity';

import { ActivitiesService } from 'src/app/services/activities.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {
  loadedActivity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ActService: ActivitiesService,
    private favoritesService: FavoritesService,
    private modalCtrl: ModalController,
  ) { }

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

  get isFavorite() {
    return this.favoritesService.checkIfFavorite(this.loadedActivity.id);
  }

  onBookActivity() {
    this.modalCtrl
      .create({
        component: CheckoutComponent,
        componentProps: {
          selectedActivity: this.loadedActivity
        }
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

}
