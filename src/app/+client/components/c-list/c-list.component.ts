import { Client } from './../../../core/models/data-api';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.scss']
})
export class CListComponent implements OnInit {
  private _list: Client[] = [];
  public get list(): Client[] {
    return this._list;
  }
  @Input() public set list(value: Client[]) {
    this._list = value;
  }
  constructor() { }

  ngOnInit() {
  }

}
