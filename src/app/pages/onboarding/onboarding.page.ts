import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {
  @ViewChild(IonSlides) slides: IonSlides;
  skipMsg: string = 'Skip';
  state: string = 'x';
  slideOpts = {
  };

  constructor(private router: Router) {

  }

  skip() {
    this.router.navigateByUrl('/login');
  }

  slideChanged() {
    if (this.slides.isEnd()) {
      this.skipMsg = 'Alright, I got it';
    } else {
      this.skipMsg = 'Skip';
    }
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) {
      this.state = 'rightSwipe';
    } else {
      this.state = 'leftSwipe';
    }
  }

  animationDone() {
    this.state = 'x';
  }
}
