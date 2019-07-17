import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { ModalController } from '@ionic/angular';
import { NewOfferComponent } from 'src/app/components/new-offer/new-offer.component';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  private OFFERS = [];

  constructor(
    private modalCtrl: ModalController,
    private activitiesService: ActivitiesService
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
    this.OFFERS = this.activitiesService.getOwnedActivities();
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
        console.log(resultData.data.offerData);
        const newOffer = resultData.data.offerData;
        this.activitiesService.addActivity(
          newOffer.name,
          newOffer.activityType,
          newOffer.description,
          newOffer.location,
          newOffer.price,
          newOffer.imgUrl,
          newOffer.contactDetails,
          newOffer.bookingStart,
          newOffer.bookingEnd,
          newOffer.capacity,
          newOffer.duration,
        );
      }
    })
  ;
  }
}
