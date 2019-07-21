import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import {
  AlertController,
  MenuController,
  LoadingController
} from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserService } from "src/app/user.service";
import * as firebase from "firebase";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  showPassword = false;
  fname = "";
  email = "";
  password = "";
  cpassword = "";

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public afStore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ["OK"]
    });
    await alert.present();
  }

  async onSubmit() {
    const { fname, email, password } = this;
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      this.afStore
        .doc(`users/${res.user.uid}`)
        .set({
          displayName: fname,
          email,
          favorites_holder: []
        })
        .then(() => {
          this.user.setUser().subscribe(() => {
            this.showAlert("Success!", "Your account is now registered");
            this.user.login();
            this.router.navigateByUrl("/app/tabs/discover");
          });
        });
    } catch (error) {
      console.dir(error);
      this.showAlert("Error", error.message);
      this.router.navigateByUrl("/register");
    }
  }

  onGoogleSignUp() {
    this.router.navigateByUrl("/app/tabs/discover");
  }

  onSwitch() {
    this.router.navigateByUrl("/login");
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    });

    await alert.present();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }
}
