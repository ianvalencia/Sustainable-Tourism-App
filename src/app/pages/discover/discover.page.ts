import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Category } from 'src/app/interfaces/category.model';
import { DiscoverService } from 'src/app/services/discover.service';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  searchTerm = '';
  searchControl: FormControl;
  searching = false;
  categories = [];
  activities = [];
  category = '';

  constructor(
    private CategoryService: DiscoverService,
    private activitiesService: ActivitiesService,
    private router: Router
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.setFilteredItems();

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.searchTerm = search;
        this.searching = false;
        this.setFilteredItems();
    });
  }

  skip() {
    this.router.navigateByUrl('/app/tabs/discover/categorypage');
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.activities = this.activitiesService.filterBySearch(this.searchTerm);
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
