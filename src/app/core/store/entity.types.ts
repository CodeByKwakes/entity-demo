/** Entity Id/Key interface */
export type IdKey = number | string;

export declare interface EntityMetaNum<T> {
  [key: number]: T;
}
/** Entity Meta interface */
export declare abstract class EntityMeta<T> implements EntityMetaNum<T> {
  [key: string]: T;
}

/** EntityState interface */
export interface EntityState<T = any> {
  ids?: IdKey[];
  entities?: EntityMeta<T>;
  loading?: boolean;
  loaded?: boolean;
  error?: any;
}

export const initialEntitiesState = (args?: any) => {

  return {
    entities: {},
    ids: [],
    loading: false,
    loaded: false,
    ...args
  };
};

export const createEntities = <T = any>(array: T[], state, keyField?) => {
  if (!keyField) {
    keyField = 'id';
  }
  const ids = array.map(item => item[keyField]);
  state.ids = ids;
  return array.reduce((entities: EntityMeta<T>, item) => {
    return {
      ...entities,
      [item[keyField]]: item
    };
  },
    {
      ...state.entities
    });
};
