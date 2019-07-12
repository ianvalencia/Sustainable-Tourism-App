import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailsPage } from './activity-details.page';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActivityDetailsPage, CheckoutComponent],
  entryComponents: [CheckoutComponent]
})
export class ActivityDetailsPageModule {}
