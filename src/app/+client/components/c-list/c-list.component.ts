import { Payload } from './../../../core/models/data-api';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.scss']
})
export class CListComponent implements OnInit {
  @Input() list: Payload[] = [];
  constructor() { }

  ngOnInit() {
  }

}
