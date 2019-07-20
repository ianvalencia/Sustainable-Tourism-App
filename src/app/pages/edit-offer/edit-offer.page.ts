import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActivitiesService } from "src/app/services/activities.service";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { NavController, LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Activity } from "src/app/interfaces/activity";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  loadedActivity: Activity;
  private placeSub: Subscription;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        // redirect
        return;
      }
      const actId = paramMap.get("id");
      this.placeSub = this.activitiesService
        .getActivity(actId)
        .subscribe(activity => {
          this.loadedActivity = activity;
          this.form = new FormGroup({
            name: new FormControl(this.loadedActivity.name, {
              updateOn: "blur",
              validators: [Validators.required]
            }),
            activityType: new FormControl(this.loadedActivity.activityType, {
              updateOn: "blur",
              validators: [Validators.required]
            }),
            description: new FormControl(this.loadedActivity.description, {
              updateOn: "blur",
              validators: [Validators.required]
            }),
            location: new FormControl(this.loadedActivity.location, {
              updateOn: "blur",
              validators: [Validators.required]
            }),
            price: new FormControl(this.loadedActivity.price, {
              updateOn: "blur",
              validators: [Validators.required]
            }),
            imgUrl: new FormControl(this.loadedActivity.imgUrl, {
              updateOn: "blur",
              validators: [Validators.required]
            }),
            contactDetails: new FormControl(
              this.loadedActivity.contactDetails,
              {
                updateOn: "blur",
                validators: [Validators.required]
              }
            ),
            bookingStart: new FormControl(
              this.loadedActivity.bookingStart.toDateString(),
              {
                updateOn: "blur",
                validators: [Validators.required]
              }
            ),
            bookingEnd: new FormControl(
              this.loadedActivity.bookingEnd.toDateString(),
              {
                updateOn: "blur",
                validators: [Validators.required]
              }
            ),
            capacity: new FormControl(this.loadedActivity.capacity, {
              updateOn: "blur",
              validators: [Validators.required]
            }),
            duration: new FormControl(this.loadedActivity.duration, {
              updateOn: "blur",
              validators: [Validators.required]
            })
          });
          this.isLoading = false;
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

    this.loadingCtrl
      .create({
        message: "Updating offer..."
      })
      .then(loadingEL => {
        loadingEL.present();
        this.activitiesService
          .updateActivity(
            this.loadedActivity.id,
            this.form.value.name,
            this.form.value.activityType,
            this.form.value.description,
            this.form.value.location,
            +this.form.value.price,
            this.form.value.imgUrl,
            this.form.value.contactDetails,
            new Date(this.form.value.bookingStart),
            new Date(this.form.value.bookingEnd),
            +this.form.value.capacity,
            +this.form.value.duration,
            this.loadedActivity.cancelled
          )
          .subscribe(() => {
            loadingEL.dismiss();
            this.form.reset();
            this.navCtrl.back();
          });
      });
  }
}
