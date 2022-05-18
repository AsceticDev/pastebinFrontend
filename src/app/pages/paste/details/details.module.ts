import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { SharedModule } from 'src/app/components/shared.module';
import { HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    SharedModule,
    HighlightModule
  ],
  declarations: [DetailsPage],
  providers: [
, {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      fullLibraryLoader: () => import('highlight.js'),
  }
}]
})
export class DetailsPageModule {}
