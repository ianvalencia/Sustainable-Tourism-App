import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() selectedActivity;
  quantity = 1;
  fullname: string;
  phoneNumber: number;
  email: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBook() {
    this.modalCtrl.dismiss(
      {
        message: 'Booked is clicked!',
        bookingData: {
          totalPayment: this.totalPayment,
          quantity: this.quantity,
          fullname: this.fullname,
          phoneNumber: this.phoneNumber,
          email: this.email
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
    return this.selectedActivity.capacity - this.selectedActivity.claimed;
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
