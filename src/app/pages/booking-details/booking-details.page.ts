import { Component, OnInit, OnDestroy } from "@angular/core";
import { Activity } from "src/app/interfaces/activity";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  ActionSheetController,
  LoadingController
} from "@ionic/angular";
import { BookingsService } from "src/app/services/bookings.service";
import { Booking } from "src/app/interfaces/booking";
import { ActivitiesService } from "src/app/services/activities.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-booking-details",
  templateUrl: "./booking-details.page.html",
  styleUrls: ["./booking-details.page.scss"]
})
export class BookingDetailsPage implements OnInit, OnDestroy {
  booking: Booking;
  activity: Activity;
  private bookingsSub: Subscription;
  private activitiesSub: Subscription;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private bookingsService: BookingsService,
    private activitiesService: ActivitiesService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        this.navCtrl.navigateBack("/app/tabs/bookings");
      }

      this.bookingsSub = this.bookingsService
        .getBooking(paramMap.get("id"))
        .subscribe(booking => {
          if (Object.entries(booking).length !== 0) {
            this.booking = booking;
            this.activitiesSub = this.activitiesService
              .getActivity(this.booking.actId)
              .subscribe(activity => {
                this.activity = activity;
                this.isLoading = false;
              });
          }
        });
    });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
    if (this.activitiesSub) {
      this.activitiesSub.unsubscribe();
    }
  }

  onSeeMore() {
    this.router.navigate(["/app/activity-details", this.booking.actId]);
  }

  onCancelBooking() {
    this.loadingCtrl
      .create({
        message: "Cancelling trip..."
      })
      .then(loadingEl => {
        loadingEl.present();
        this.bookingsService.cancelBooking(this.booking.id).subscribe(() => {
          loadingEl.dismiss();
          this.navCtrl.back();
        });
      });
  }

  onMore() {
    this.actionSheetCtrl
      .create({
        header: "Choose an Action",
        buttons: [
          {
            text: "Cancel Trip",
            role: "destructive",
            handler: () => {
              this.onCancelBooking();
            }
          },
          {
            text: "Cancel",
            role: "cancel"
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }
}
