import { ItemComponent } from './routes/item/item.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './routes/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':clientId',
    component: ItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
