import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity;
  @Input() editMode = false;

  maxLength = 25;

  constructor() { }

  ngOnInit() {
    console.log(this.activity);
  }

  get linkPrefix() {
    return this.editMode ? '/app/edit-offer' : '/app/activity-details';
  }

}
