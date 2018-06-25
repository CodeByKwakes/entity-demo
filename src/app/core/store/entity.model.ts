// #region --- Models ---
export declare type ComparerStr<T> = (a: T, b: T) => string;
export declare type ComparerNum<T> = (a: T, b: T) => number;
export declare type Comparer<T> = ComparerNum<T> | ComparerStr<T>;

export declare type IdSelectorStr<T> = (model: T) => string;
export declare type IdSelectorNum<T> = (model: T) => number;
export declare type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;

export declare interface DictionaryNum<T> {
  [id: number]: T;
}
export declare abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T;
}

export declare interface UpdateStr<T> {
  id: string;
  changes: Partial<T>;
}
export declare interface UpdateNum<T> {
  id: number;
  changes: Partial<T>;
}
export declare type Update<T> = UpdateStr<T> | UpdateNum<T>;

export interface EntityState<T> {
  ids: string[] | number[];
  entities: Dictionary<T>;
}
export interface EntityDefinition<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;
}
export interface EntityStateAdapter<T> {
  addOne<S extends EntityState<T>>(entity: T, state: S): S;
  addMany<S extends EntityState<T>>(entities: T[], state: S): S;
  addAll<S extends EntityState<T>>(entities: T[], state: S): S;
  removeOne<S extends EntityState<T>>(key: string | number, state: S): S;
  removeMany<S extends EntityState<T>>(keys: string[] | number[], state: S): S;
  removeAll<S extends EntityState<T>>(state: S): S;
  updateOne<S extends EntityState<T>>(update: Update<T>, state: S): S;
  updateMany<S extends EntityState<T>>(updates: Update<T>[], state: S): S;
  upsertOne<S extends EntityState<T>>(entity: T, state: S): S;
  upsertMany<S extends EntityState<T>>(entities: T[], state: S): S;
}
export declare interface EntitySelectors<T, V> {
  selectIds: (state: V) => string[] | number[];
  selectEntities: (state: V) => Dictionary<T>;
  selectAll: (state: V) => T[];
  selectTotal: (state: V) => number;
}
export interface EntityAdapter<T> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;
  getInitialState(): EntityState<T>;
  getInitialState<S extends object>(state: S): EntityState<T> & S;
  getSelectors(): EntitySelectors<T, EntityState<T>>;
  getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
}
// #endregion --- Models ---

// #region --- create Entity Adapter ---
export declare function createEntityAdapter<T, S extends object>(
  options?: {
    selectId?: IdSelector<T>;
    sortComparer?: false | Comparer<T>;
  }
): EntityAdapter<T>;

// #endregion --- create Entity Adapter   ---

// #region ---  entity_state ---
export declare function getInitialEntityState<V>(): EntityState<V>;
export declare function createInitialStateFactory<V>(): {
  getInitialState: {
    (): EntityState<V>;
    <S extends object>(additionalState: S): EntityState<V> & S;
  };
};
// #endregion ---  entity_state  ---

// #region --- sorted_state_adapter.d.ts  ---
export declare function createSortedStateAdapter<T>(selectId: IdSelector<T>, sort: Comparer<T>): EntityStateAdapter<T>;
// #endregion ---  sorted_state_adapter.d.ts  ---

// #region --- state_adapter  ---
export declare enum DidMutate {
  EntitiesOnly = 0,
  Both = 1,
  None = 2,
}
export declare function createStateOperator<V, R>(mutator: (arg: R, state: EntityState<V>) => DidMutate): EntityState<V>;
// #endregion ---  state_adapter  ---

// #region --- state_selectors  ---
export declare function createSelectorsFactory<T>(): {
  getSelectors: {
    (): EntitySelectors<T, EntityState<T>>;
    <V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
  };
};
// #endregion ---  state_selectors  ---

// #region --- unsorted_state_adapter  ---
export declare function createUnsortedStateAdapter<T>(selectId: IdSelector<T>): EntityStateAdapter<T>;
// #endregion ---    ---
