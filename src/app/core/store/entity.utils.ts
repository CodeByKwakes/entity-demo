import { Payload } from '../models/data-api';
import { Dictionary } from './entity.model';

export const createEnitites = (array: any[], keyField, state?) => {
  const ids = array.map(item => item[keyField]);

  const entities: Dictionary<Payload> = {};
  array.forEach(item => {
    entities[item[keyField]] = item;
  });
  state.ids = ids;
  return entities;
};
