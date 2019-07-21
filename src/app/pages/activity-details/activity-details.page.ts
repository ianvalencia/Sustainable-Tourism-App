import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ModalController,
  ActionSheetController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { Subscription } from "rxjs";

import { Activity } from "src/app/interfaces/activity";

import { ActivitiesService } from "src/app/services/activities.service";
import { FavoritesService } from "src/app/services/favorites.service";
import { CheckoutComponent } from "src/app/components/checkout/checkout.component";
import { BookingsService } from "src/app/services/bookings.service";
import { UserService } from 'src/app/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: "app-activity-details",
  templateUrl: "./activity-details.page.html",
  styleUrls: ["./activity-details.page.scss"]
})
export class ActivityDetailsPage implements OnInit, OnDestroy {
  loadedActivity: Activity;
  editable;
  private placeSub: Subscription;
  isLoading = true;
  actId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ActService: ActivitiesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private bookingsService: BookingsService,
    public afstore: AngularFirestore, 
    public user: UserService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.editable = history.state.editable;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        // redirect
        return;
      }
      this.actId = paramMap.get("id");

      this.placeSub = this.ActService.getActivity(this.actId).subscribe(
        activity => {
          this.loadedActivity = activity;
          this.isLoading = false;
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onToggleFavorite() {
    if (!this.loadedActivity) {
      return;
    }
    this.ActService.toggleFavorite(this.actId);
  }

  get isFavorite() {
    if (!this.loadedActivity) {
      return false;
    }
    return this.ActService.checkIfFavorite(this.actId);
  }

  onBookActivity() {
    this.modalCtrl
      .create({
        component: CheckoutComponent,
        componentProps: {
          selectedActivity: this.loadedActivity
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === "book") {
          this.loadingCtrl
            .create({
              message: "Booking activity..."
            })
            .then(loadingEL => {
              loadingEL.present();
              const data = resultData.data.bookingData;
              this.bookingsService
                .addBooking(
                  this.actId,
                  data.bookingDate,
                  data.quantity,
                  data.total,
                  data.fullname,
                  data.contactNumber,
                  data.email
                )
                .subscribe(() => {
                  loadingEL.dismiss();
                  this.navCtrl.back();
                });
            });
        }
      });
  }

  onOptionsPressed() {
    this.actionSheetCtrl
      .create({
        header: "Choose an Action",
        buttons: [
          {
            text: "Edit Offer",
            handler: () => {
              this.router.navigate(["/app/edit-offer", this.actId]);
            }
          },
          {
            text: !this.loadedActivity.cancelled
              ? "Cancel Activity"
              : "Activate Activity",
            handler: () => {
              this.loadingCtrl
                .create({
                  message: !this.loadedActivity.cancelled
                    ? "Cancelling activity..."
                    : "Activating activity"
                })
                .then(loadingEL => {
                  loadingEL.present();
                  this.ActService.updateActivity(
                    this.loadedActivity.id,
                    this.loadedActivity.name,
                    this.loadedActivity.activityType,
                    this.loadedActivity.description,
                    this.loadedActivity.location,
                    this.loadedActivity.price,
                    this.loadedActivity.imgUrl,
                    this.loadedActivity.contactDetails,
                    this.loadedActivity.bookingStart,
                    this.loadedActivity.bookingEnd,
                    this.loadedActivity.capacity,
                    this.loadedActivity.duration,
                    !this.loadedActivity.cancelled
                  ).subscribe(() => {
                    loadingEL.dismiss();
                    this.navCtrl.back();
                  });
                });
            }
          },
          {
            text: "Delete Activity",
            role: "destructive"
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
