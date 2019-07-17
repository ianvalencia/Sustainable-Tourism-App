import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Activity } from 'src/app/interfaces/activity';

import { ActivitiesService } from 'src/app/services/activities.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { BookingsService } from 'src/app/services/bookings.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit, OnDestroy {
  loadedActivity;
  editable;
  private placeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ActService: ActivitiesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private bookingsService: BookingsService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        // redirect
        return;
      }
      const actId = paramMap.get('id');

      this.placeSub = this.ActService.getActivity(actId).subscribe(activity => {
        this.loadedActivity = activity;
      });
    });

    this.editable = history.state.editable;
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onToggleFavorite() {
    this.ActService.toggleFavorite(this.loadedActivity.id);
  }

  get isFavorite() {
    return this.ActService.checkIfFavorite(this.loadedActivity.id);
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
        if (resultData.role === 'book') {
          this.loadingCtrl.create({
            message: 'Booking activity...'
          }).then(loadingEL => {
            loadingEL.present();
            const data = resultData.data.bookingData;
            // console.log(data);
            this.bookingsService.addBooking(
              this.userService.User.id,
              this.loadedActivity.id,
              data.bookingDate,
              data.quantity,
              data.total,
              data.fullname,
              data.contactNumber,
              data.email
            ).subscribe(() => {
                loadingEL.dismiss();
              }
            );
          });
        }
      })
    ;
  }

  onOptionsPressed() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Edit Offer',
          handler: () => {
            this.router.navigate(['/app/edit-offer', this.loadedActivity.id]);
          }
        },
        {
          text: !this.loadedActivity.cancelled ? 'Cancel Activity' : 'Activate Activity',
          handler: () => {
            this.loadingCtrl.create({
              message: !this.loadedActivity.cancelled ? 'Cancelling activity...' : 'Activating activity'
            }).then(loadingEL => {
              loadingEL.present();
              this.ActService.toggleCancellation(
                this.loadedActivity.id,
              ).subscribe(() => {
                loadingEL.dismiss();
                this.navCtrl.back();
              });
            });
          }
        },
        {
          text: 'Delete Activity',
          role: 'destructive'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

}
