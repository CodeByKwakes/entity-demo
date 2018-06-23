import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClientState } from '../../../core/store/client.state';
import { Payload } from './../../../core/models/data-api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Select(ClientState.getAllClient) client$: Observable<Payload[]>;
  constructor() { }

  ngOnInit() { }

}
