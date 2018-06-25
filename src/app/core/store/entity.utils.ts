export interface EntityState<V> {
  ids: string[] | number[];
  entities: { [key: string]: V };
}

export const createEnitites = (array: any[], keyField, state?) => {
  const ids = array.map(item => item[keyField]);
  const entities: {
    [key: number]: any;
  } = {};
  array.forEach(item => {
    entities[item[keyField]] = item;
  });
  state.ids = ids;
  return entities;
};
