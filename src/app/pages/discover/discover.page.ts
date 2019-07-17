import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Category } from 'src/app/interfaces/category.model';
import { DiscoverService } from 'src/app/services/discover.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  searchTerm = '';
  searchControl: FormControl;
  searching = false;
  categories = [];
  activities = [];
  rawActivities =[];
  category = '';
  private activitiesSub: Subscription;

  constructor(
    private CategoryService: DiscoverService,
    private activitiesService: ActivitiesService,
    private router: Router
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.activitiesSub = this.activitiesService.getBookableActivities().subscribe(activities => {
      this.rawActivities = activities;

      this.setFilteredItems();

      this.searchControl.valueChanges
        .pipe(debounceTime(700))
        .subscribe(search => {
          this.searchTerm = search;
          this.searching = false;
          this.setFilteredItems();
      });
    });
  }

  ngOnDestroy() {
    if (this.activitiesSub) {
      this.activitiesSub.unsubscribe();
    }
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.activities = this.rawActivities.filter(item => {
      return (item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) ||
        (item.location.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) ||
        (item.activityType.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    });

  }

  searchByCategory() {
    // ewan
  }

  get showCategories() {
    return this.searchTerm === '';
  }

  get categorySearch() {
    return this.category === '';
  }

  get isActivitiesEmpty() {
    return this.activities.length === 0;
  }
}
