import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ListComponent } from './routes/list/list.component';
import { ItemComponent } from './routes/item/item.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  declarations: [ListComponent, ItemComponent]
})
export class ClientModule { }
