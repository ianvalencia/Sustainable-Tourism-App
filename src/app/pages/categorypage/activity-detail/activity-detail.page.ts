import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CategorypageService } from '../categorypage.service';

import { Activity } from '../activity.model';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  loadedActivity: Activity;
  constructor(private activatedRoute: ActivatedRoute, private ActService: CategorypageService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('actId')) {
        // redirect
        return;
      }
      const actId = paramMap.get('actId');
      this.loadedActivity = this.ActService.getActivity(actId);
    });
  }

}
