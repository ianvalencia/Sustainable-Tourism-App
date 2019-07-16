import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  fname = '';
  email = '';
  password = '';

  constructor(
    private router: Router,
    private forgotCtrl: AlertController,
    private toastCtrl: ToastController,
    public AfAuth: AngularFireAuth,
    public user: UserService,
    private loadingCtrl: LoadingController
  ) { }

  async presentAlert(title: string, content: string) {
    const alert = await this.forgotCtrl.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

  async onSubmit() {
    const { fname, email, password } = this;
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...'
    })
    .then(async loadingEl => {
      loadingEl.present();
      try {
        const res = await this.AfAuth.auth.signInWithEmailAndPassword(email, password);
        if (res.user) {
          this.user.setUser({
            // fname,
            email,
            uid: res.user.uid
          });
        }
        this.router.navigateByUrl('/app/tabs/discover');
        loadingEl.dismiss();
      } catch (err) {
        console.dir(err);
        loadingEl.dismiss();
        if (err.code === 'auth/invalid-email') {
          this.presentAlert('Invalid Email!', err.message);
        }
        if (err.code === 'auth/wrong-password') {
          this.presentAlert('Wrong password!', err.message);
        }
        if (err.code === 'auth/user-not-found') {
          console.log('Error');
          this.presentAlert(
            'User Not Found!',
            'The username and password you entered did not match our records. Please double-check and try again.'
          );
        }
      }
    });
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
 }
