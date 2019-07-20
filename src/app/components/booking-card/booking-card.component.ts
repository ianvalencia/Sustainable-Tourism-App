import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit, OnDestroy {
  @Input() booking;
  activity;
  private activitiesSub: Subscription;

  maxNameLength = 30;

  constructor(
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.activitiesSub = this.activitiesService.getActivity(this.booking.actId).subscribe(activity => {
      this.activity = activity;
    });
  }

  ngOnDestroy() {
    if (this.activitiesSub) {
      this.activitiesSub.unsubscribe();
    }
  }

}
