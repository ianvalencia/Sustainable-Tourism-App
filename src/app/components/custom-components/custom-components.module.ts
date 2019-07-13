import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextDividerComponent } from '../text-divider/text-divider.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TextDividerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TextDividerComponent]
})
export class CustomComponentsModule { }
