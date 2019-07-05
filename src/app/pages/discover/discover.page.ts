import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/interfaces/category.model';

import { DiscoverService } from './discover.service'

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  categories: Category[];
  constructor(private CategoryService: DiscoverService) { }

  ngOnInit() {
    this.categories = this.CategoryService.getAllCategories();
  }

}
