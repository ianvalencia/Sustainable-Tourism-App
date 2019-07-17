import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Activity } from 'src/app/interfaces/activity';

import { ActivitiesService } from 'src/app/services/activities.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit, OnDestroy {
  loadedActivity;
  editable;
  private placeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ActService: ActivitiesService,
    private favoritesService: FavoritesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        // redirect
        return;
      }
      const actId = paramMap.get('id');

      this.placeSub = this.ActService.getActivity(actId).subscribe(activity => {
        this.loadedActivity = activity;
      });
    });

    this.editable = history.state.editable;
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
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
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'book') {
          console.log(resultData.data.bookingData);
        }
      })
    ;
  }

}
