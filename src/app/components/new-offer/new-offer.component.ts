import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss'],
})
export class NewOfferComponent implements OnInit {
  @ViewChild('offerForm') form: NgForm;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
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
    this.modalCtrl.dismiss(
      {
        offerData: {
          name: this.form.value['activity-name'],
          activityType: this.form.value['activity-type'],
          description: this.form.value['description'],
          location: this.form.value['location'],
          price: this.form.value['price'],
          imgUrl: this.form.value['image-url'],
          contactDetails: this.form.value['contact-number'],
          bookingStart: this.form.value['start-booking'],
          bookingEnd: this.form.value['end-booking'],
          duration: this.form.value['duration'],
          capacity: this.form.value['max-bookings']
        }
      },
      'create'
    );
  }

}
