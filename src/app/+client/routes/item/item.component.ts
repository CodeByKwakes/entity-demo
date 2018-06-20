import { RouterState } from './../../../core/store/router.state';
import { Observable } from 'rxjs';
import { ClientState } from './../../../core/store/client.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Payload } from '../../../core/models/data-api';
import { tap, map } from 'rxjs/operators';
import { SelectClient } from '../../../core/store/client.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Select(ClientState.getSelectedClient) client$: Observable<Payload>;
  @Select(ClientState.getSelected) selected$: Observable<Payload>;
  @Select(RouterState.getRouterParams) params$: Observable<any>;
  constructor(private store: Store) { }

  ngOnInit() {
    this.params$
      .pipe(
        map(param => param.clientId),
        tap(param => this.store.dispatch(new SelectClient(param)))
      )
      .subscribe();

    this.client$
      .pipe(
        tap(client => console.log('client', client))
      )
      .subscribe();

      this.selected$.subscribe();
  }


}
