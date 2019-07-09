import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  fname = '';
  email = '';
  password = '';
  cpassword = '';

  constructor(private router: Router, public AfAuth: AngularFireAuth, public alert: AlertController, public afstore: AngularFirestore, public user: UserService, public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }


  async onSubmit() {
    const{ fname, email, password, cpassword } = this;
    if (password !== cpassword) {
      this.showAlert('Error!', 'Passwords do not match');
      return console.error('Passwords do not match');
    }

    try {
      const res = await this.AfAuth.auth.createUserWithEmailAndPassword(email, password);

      this.afstore.doc(`users/${res.user.uid}`).set({
        fname,
        email
      });

      this.user.setUser({
       // fname,
        email,
        uid: res.user.uid
      });



      this.showAlert('Success!', 'Your account is now registered');
      this.router.navigateByUrl('/app/tabs/discover');
    } catch (error) {
      console.dir(error);
      this.showAlert('Error', error.message);
      this.router.navigateByUrl('/register');
    }
  }

  onGoogleSignUp() {
    this.router.navigateByUrl('/app/tabs/discover');
  }

  onSwitch() {
    this.router.navigateByUrl('/login');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });

    await alert.present();

  }

}
