import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.page.html',
  styleUrls: ['./categorypage.page.scss'],
})
export class CategorypagePage implements OnInit {
  activities;

  constructor(private ActivityService: ActivitiesService) { }

  ngOnInit() {
    this.activities = this.ActivityService.getActivities();
  }

}
