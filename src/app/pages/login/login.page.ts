import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fname: string = ""
  email: string = ""
  password: string = ""

  constructor(private router: Router, private forgotCtrl: AlertController, private toastCtrl: ToastController, public AfAuth: AngularFireAuth, public user: UserService) { }

  ngOnInit() {
  }

  async onSubmit() {
    const { fname, email, password } = this
    try{
      const res = await this.AfAuth.auth.signInWithEmailAndPassword(email, password)
      if(res.user){
        this.user.setUser({
          //fname,
          email,
          uid: res.user.uid
        })
      }

    }catch(err) {
      console.dir(err)
      if(err.code == "auth/user-not-found"){
        console.log("User not found.")
        this.router.navigateByUrl('/login');
      }
    }
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
