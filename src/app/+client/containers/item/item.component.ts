import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Client } from '../../../core/models/data-api';
import { ClientState } from '../../../core/store/client/client.state';
import { RouterState } from '../../../core/store/router/router.state';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Select(ClientState.getSelectedClient) client$: Observable<Client>;
  @Select(ClientState.getSelected) selected$: Observable<Client>;
  @Select(RouterState.getRouterParams) params$: Observable<any>;
  @Select(ClientState.selectedClient()) newSelected$: Observable<Client>;
  constructor(private store: Store) { }

  ngOnInit() {}


}
