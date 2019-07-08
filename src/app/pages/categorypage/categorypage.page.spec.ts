import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorypagePage } from './categorypage.page';

describe('CategorypagePage', () => {
  let component: CategorypagePage;
  let fixture: ComponentFixture<CategorypagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorypagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorypagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
