import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController, LoadingController, NavController } from '@ionic/angular';

import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss']
})
export class NewOfferPage implements OnInit {
  @ViewChild('offerForm') form: NgForm;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {}

  onCancel() {
    this.navCtrl.back();
  }

  async onPressCancel() {
    if (this.form.pristine) {
      this.onCancel();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Confirm',
        message: 'Do you want to discard all changes?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Ok',
            handler: () => {
              this.onCancel();
            }
          }
        ]
      });

      await alert.present();
    }
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating new offer...'
    }).then(loadingEL => {
      loadingEL.present();
      this.activitiesService.addActivity(
        this.form.value['activity-name'],
        this.form.value['activity-type'],
        this.form.value['description'],
        this.form.value['location'],
        +this.form.value['price'],
        this.form.value['image-url'],
        this.form.value['contact-number'],
        new Date(this.form.value['start-booking']),
        new Date(this.form.value['end-booking']),
        +this.form.value['max-bookings'],
        +this.form.value['duration']
      ).subscribe(() => {
        loadingEL.dismiss();
        this.form.reset();
        this.navCtrl.back();
      });
    });
  }

}
