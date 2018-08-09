import { RouterState } from './../../../core/store/router.state';
import { Observable } from 'rxjs';
import { ClientState } from './../../../core/store/client.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Client } from '../../../core/models/data-api';
import { tap, map } from 'rxjs/operators';
import { SelectClient } from '../../../core/store/client.actions';

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

  ngOnInit() {
    // this.params$
    //   .pipe(
    //     map(param => param.get('clientId')),
    //     tap(param => this.store.dispatch(new SelectClient(param)))
    //   );


    // this.client$
    //   .pipe(
    //     tap(client => console.log('client', client))
    //   );


  }


}
