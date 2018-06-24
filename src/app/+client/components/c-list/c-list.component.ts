import { Payload } from './../../../core/models/data-api';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.scss']
})
export class CListComponent implements OnInit {
  private _list: Payload[] = [];
  public get list(): Payload[] {
    return this._list;
  }
  @Input() public set list(value: Payload[]) {
    this._list = value;
  }
  constructor() { }

  ngOnInit() {
  }

}
