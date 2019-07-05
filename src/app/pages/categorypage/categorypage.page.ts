import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/pages/categorypage/activity.model';

import { CategorypageService } from './categorypage.service'

@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.page.html',
  styleUrls: ['./categorypage.page.scss'],
})
export class CategorypagePage implements OnInit {
  activities: Activity[];
  constructor(private ActivityService: CategorypageService) { }

  ngOnInit() {
    this.activities = this.ActivityService.getAllActivites();
  }

}
