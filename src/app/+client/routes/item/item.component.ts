import { Observable } from 'rxjs';
import { ClientState } from './../../../core/store/client.state';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Payload } from '../../../core/models/data-api';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Select(ClientState.getSelectedClient) client$: Observable<Payload>;
  constructor() { }

  ngOnInit() {
  }

}
