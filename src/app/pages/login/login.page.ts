import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private forgotCtrl: AlertController, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigateByUrl('/app/tabs/discover');
  }

  onGoogleSignIn() {
    this.router.navigateByUrl('/app/tabs/discover');
  }

  onSwitch() {
    this.router.navigateByUrl('/register');
  }

  async onForgotPassword() {
    const forgot = await this.forgotCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: async data => {
            console.log('Send clicked');
            const toast = await this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            await toast.present();
          }
        }
      ]
    });
    await forgot.present();
  }
}
