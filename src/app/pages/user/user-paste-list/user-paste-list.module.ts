import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPasteListPageRoutingModule } from './user-paste-list-routing.module';

import { UserPasteListPage } from './user-paste-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPasteListPageRoutingModule
  ],
  declarations: [UserPasteListPage]
})
export class UserPasteListPageModule {}
