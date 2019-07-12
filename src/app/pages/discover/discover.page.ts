import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/interfaces/category.model';

import { DiscoverService } from './discover.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  categories: Category[];
  constructor(private CategoryService: DiscoverService, private router: Router) { }

  ngOnInit() {
    this.categories = this.CategoryService.getAllCategories();
  }

  skip() {
    this.router.navigateByUrl('/app/tabs/discover/categorypage');
  }
}
