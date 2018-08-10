import { SelectClient } from '../../../core/store/client/client.actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClientState } from '../../../core/store/client/client.state';
import { Client } from './../../../core/models/data-api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Select(ClientState.getAllClient) client$: Observable<Client[]>;
  constructor(private store: Store) { }

  ngOnInit() { }

  onRouteClient(id) {
    // this.store.dispatch(new SelectClient(id));
  }
}
