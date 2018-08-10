import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './containers/item/item.component';
import { ListComponent } from './containers/list/list.component';
import { ClientExistsGuard } from './guards/client-exists.guard';
import { ClientGuard } from './guards/client.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ClientGuard],
    component: ListComponent
  },
  {
    path: ':clientId',
    canActivate: [ClientExistsGuard],
    component: ItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
