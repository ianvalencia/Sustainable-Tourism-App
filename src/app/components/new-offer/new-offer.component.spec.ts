import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferComponent } from './new-offer.component';

describe('NewOfferComponent', () => {
  let component: NewOfferComponent;
  let fixture: ComponentFixture<NewOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOfferComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
