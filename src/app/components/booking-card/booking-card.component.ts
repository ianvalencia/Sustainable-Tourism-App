import { Component, OnInit, Input } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {
  @Input() booking;
  activity;

  maxNameLength = 30;

  constructor(
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.activity = this.activitiesService.getActivity(this.booking.aid);
    console.log(this.activity);
  }

}
