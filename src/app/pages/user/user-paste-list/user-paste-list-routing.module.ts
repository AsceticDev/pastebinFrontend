import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPasteListPage } from './user-paste-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserPasteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPasteListPageRoutingModule {}
