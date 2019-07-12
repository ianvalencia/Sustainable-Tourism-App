import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  private OFFERS: Activity[] = [];
  constructor() { }

  get offers() {
    return [...this.OFFERS];
  }

  public isOffersEmpty() {
    if (this.OFFERS.length === 0) {
      return true;
    }
    return false;
  }

  ngOnInit() {

  }
}
