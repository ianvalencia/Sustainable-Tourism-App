import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() selectedActivity: Activity;
  @ViewChild('booking') form: NgForm;
  quantity = 1;
  fullname: string;
  phoneNumber: number;
  email: string;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

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

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBook() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        message: 'Booked is clicked!',
        bookingData: {
          fullname: this.form.value['full-name'],
          contactNumber: this.form.value['contact-number'],
          email: this.form.value.email,
          total: +this.totalPayment,
          quantity: this.quantity,
          bookingDate: new Date(this.form.value['booking-date'])
        }
      },
      'book'
    );
  }

  onPromoCode() {
    console.log('PromoCode');
  }

  onDecrease() {
    this.quantity--;
  }

  onIncrease() {
    this.quantity++;
  }

  get availableSlots() {
    return this.selectedActivity.capacity - this.selectedActivity.bookings;
  }

  get canDecrease() {
    return (this.quantity > 1);
  }

  get canIncrease() {
    return (this.quantity < this.availableSlots);
  }

  get totalPayment() {
    return this.quantity * this.selectedActivity.price;
  }

}
