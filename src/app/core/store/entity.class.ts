import { Client } from '../models/data-api';
import { Dictionary } from './entity.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor() { }

  createEnitites = (array: any[], keyField, state?) => {
    const ids = array.map(item => item[keyField]);

    const entities: Dictionary<Client> = {};
    array.forEach(item => {
      entities[item[keyField]] = item;
    });
    state.ids = ids;
    return entities;
  }
}
