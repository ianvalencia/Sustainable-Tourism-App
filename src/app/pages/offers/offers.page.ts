import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';

import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  private OFFERS: Activity[] = [];
  constructor(private router: Router) { }

  get offers() {
    return [...this.OFFERS];
  }

  public isOffersEmpty() {
    if (this.OFFERS.length === 0) {
      return true;
    }
    return false;
  }

  newOffer() {
    this.router.navigateByUrl('/new-offer');
  }

  ngOnInit() {

  }
}
