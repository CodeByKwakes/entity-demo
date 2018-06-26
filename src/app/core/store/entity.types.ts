export declare interface EntityMetaNum<T> {
  [key: number]: T;
}
/** Entity Meta interface */
export declare abstract class EntityMeta<T> implements EntityMetaNum<T> {
  [key: string]: T;
}

export interface EntityState<T> {
  ids?: KEY[];
  entities?: EntityMeta<T>;
  loading?: boolean;
  error?: any;
}

/** Entity id interface */
export type KEY = number | string;
