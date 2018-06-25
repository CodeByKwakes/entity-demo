import { Payload } from '../models/data-api';

export declare interface DictionaryNum<T> {
  [key: number]: T;
}

export declare abstract class Dictionary<T> implements DictionaryNum<T> {
  [key: string]: T;
}

export interface EntityState<T> {
  ids: string[] | number[];
  entities: Dictionary<T>;
}

export const createEnitites = (array: any[], keyField, state?) => {
  const ids = array.map(item => item[keyField]);

  const entities: Dictionary<Payload> = {};
  array.forEach(item => {
    entities[item[keyField]] = item;
  });
  state.ids = ids;
  return entities;
};
