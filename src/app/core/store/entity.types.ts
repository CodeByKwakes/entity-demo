import { EntityState } from './entity.types';

export declare interface EntityMetaNum<T> {
  [key: number]: T;
}
/** Entity Meta interface */
export declare abstract class EntityMeta<T> implements EntityMetaNum<T> {
  [key: string]: T;
}

export interface EntityState<T = any> {
  ids?: IdKey[];
  entities?: EntityMeta<T>;
  loading?: boolean;
  error?: any;
}

/** Entity id interface */
export type IdKey = number | string;

export const getInitialEntitiesState = (args?) => {

  return {
    entities: {},
    ids: [],
    loading: false,
    ...args
  };
};


export const getEntities = (array: any[], state, keyField?) => {
  if (!keyField) {
    keyField = 'id';
  }
  const ids = array.map(item => item[keyField]);
  state.ids = ids;
  return array.reduce((entities, item) => {
    // console.log('ojb', obj)
    return {
      ...entities,
      [item[keyField]]: item
    };
  },
    {
      ...state.entities
    });
};
