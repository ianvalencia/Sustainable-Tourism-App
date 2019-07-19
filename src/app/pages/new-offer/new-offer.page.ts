import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  offer: string;
  provider : string;
  type : string;
  location: string;
  description: string;
  price: number;

  constructor(public alertController: AlertController) { 
    this.offer="";
    this.provider="";
    this.type="";
    this.location="";
    this.description="";
    this.price= 0;
  }

  async presentAlert() {
    if(this.offer.trim().length <= 0 || this.provider.trim().length <= 0 || this.location.trim().length <= 0) {
      const alert = await this.alertController.create({
        header: 'Invalid Input',
        message: 'Please fill in all missing fields.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  ngOnInit() {
  }

}
