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
    loading: true,
    error: null,
    ...args
  };
};
