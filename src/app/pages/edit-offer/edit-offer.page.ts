import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from 'src/app/services/activities.service';
import { NgForm } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  @ViewChild('editForm') form: NgForm;
  loadedActivity;
  private placeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        // redirect
        return;
      }
      const actId = paramMap.get('id');
      this.placeSub = this.activitiesService.getActivity(actId).subscribe(activity => {
        this.loadedActivity = activity;
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  get startString() {
    return this.loadedActivity.bookingStart.toString();
  }

  get endString() {
    return this.loadedActivity.bookingEnd.toString();
  }

  onSave() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Updating offer...'
    }).then(loadingEL => {
      loadingEL.present();
      this.activitiesService.updateActivity(
        this.loadedActivity.id,
        this.form.value['activity-name'],
        this.form.value['activity-type'],
        this.form.value['description'],
        this.form.value['location'],
        +this.form.value['price'],
        this.form.value['image-url'],
        this.form.value['contact-number'],
        new Date(this.form.value['start-booking']),
        new Date(this.form.value['end-booking']),
        +this.form.value['max-bookings'],
        +this.form.value['duration']
      ).subscribe(() => {
        loadingEL.dismiss();
        this.form.reset();
        this.navCtrl.back();
      });
    });
  }

}
