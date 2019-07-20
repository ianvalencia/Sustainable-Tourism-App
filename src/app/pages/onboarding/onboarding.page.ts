import { Component, ViewChild, OnInit } from "@angular/core";
import { IonSlides, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.scss"]
})
export class OnboardingPage implements OnInit {
  showSkip = true;
  buttonMsg = "SKIP";
  slideContent = [
    {
      imgUrl: "assets/img/beach.svg",
      title: "Plan Your Trip",
      subtitle:
        "Make your personalized trip from a wide range of eco-friendly outdoor activities available"
    },
    {
      imgUrl: "assets/img/localization.svg",
      title: "Support Locals",
      subtitle: "Everything, from lodging to activities, are offered by locals"
    },
    {
      imgUrl: "assets/img/walk.svg",
      title: "Start The Adventure",
      subtitle: "Enjoy your eco-friendly trip and start the adventure!"
    }
  ];

  @ViewChild("slides") slides: IonSlides;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  startApp() {
    this.router
      .navigateByUrl("/title")
      .then(() => this.storage.set("onboarded", true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
      this.buttonMsg = this.showSkip ? "SKIP" : "GET STARTED";
    });
  }

  ionViewWillEnter() {
    this.storage.get("onboarded").then(res => {
      if (res === true) {
        this.router.navigateByUrl("/title");
      }
    });

    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }
}
