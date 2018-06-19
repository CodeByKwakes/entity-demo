import { DataApi, Payload } from './../../../core/models/data-api';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../core/services/data.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  client$: Observable<Payload>;
  constructor(private api: DataService) { }

  ngOnInit() {
    this.client$ = this.api.list()
      .pipe(
        map((response: DataApi) => response.data.payload),
        tap(payload => console.log('payload', payload))
      );
  }

}
