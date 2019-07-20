import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  menuItems = [
    {
      icon: "contact",
      label: "Profile",
      link: "/app/profile"
    },
    {
      icon: "heart",
      label: "My Favorites",
      link: "/app/favorites"
    },
    {
      icon: "compass",
      label: "Discover",
      link: "/app/tabs/discover"
    },
    {
      icon: "calendar",
      label: "My Bookings",
      link: "/app/tabs/bookings"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private user: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  onLogout() {
    this.user.logout();
    this.navCtrl.navigateBack("/login");
  }
}
