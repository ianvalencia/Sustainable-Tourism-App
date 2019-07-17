import { Component, OnInit, Input } from '@angular/core';
import { ActivityDetailsPage } from 'src/app/pages/activity-details/activity-details.page';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {
  @Input() activity;
  @Input() editMode = false;

  maxLength = 25;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  get linkPrefix() {
    return this.editMode ? '/app/edit-offer' : '/app/activity-details';
  }

  goToActDetails() {
    const navOpts: NavigationExtras = {
      state: {
        editable: this.editMode
      }
    };
    this.router.navigate(['/app/activity-details', this.activity.id], navOpts);
  }
}
