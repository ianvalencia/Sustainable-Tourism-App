import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextDividerComponent } from './text-divider/text-divider.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { BookingCardComponent } from './booking-card/booking-card.component';

@NgModule({
  declarations: [TextDividerComponent, ActivityCardComponent, BookingCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [TextDividerComponent, ActivityCardComponent, BookingCardComponent]
})
export class ComponentsModule { }
