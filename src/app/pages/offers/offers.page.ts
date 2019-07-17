import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Activity } from 'src/app/interfaces/activity';
import { NewOfferComponent } from 'src/app/components/new-offer/new-offer.component';
import { ActivitiesService } from 'src/app/services/activities.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  private OFFERS: Activity[];
  private offersSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private activitiesService: ActivitiesService,
    private userService: UserService
  ) { }

  get offers() {
    return [...this.OFFERS];
  }

  public isOffersEmpty() {
    if (this.OFFERS.length === 0) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.offersSub = this.activitiesService.getOwnedActivities().subscribe(activities => {
      // this.OFFERS = activities.filter(item => {
      //   return item.owner.id === this.userService.User.id;
      // });
      this.OFFERS = activities;
    });
  }

  ngOnDestroy() {
    if(this.offersSub) {
      this.offersSub.unsubscribe();
    }
  }

  onCreateOffer() {
    this.modalCtrl
    .create({
      component: NewOfferComponent,
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === 'create') {
        const newOffer = resultData.data.offerData;
        this.activitiesService.addActivity(
          newOffer.name,
          newOffer.activityType,
          newOffer.description,
          newOffer.location,
          +newOffer.price,
          newOffer.imgUrl,
          newOffer.contactDetails,
          new Date(newOffer.bookingStart),
          new Date(newOffer.bookingEnd),
          +newOffer.capacity,
          +newOffer.duration,
        );
      }
    })
  ;
  }
}
