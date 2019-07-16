import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDividerComponent } from './text-divider.component';

describe('TextDividerComponent', () => {
  let component: TextDividerComponent;
  let fixture: ComponentFixture<TextDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDividerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
