import { Client } from './../../models/data-api';
import { initialEntitiesState, createEntities } from './../utils/entity.types';
import { ClientStateModel } from './client.state';

export const initialState: ClientStateModel = initialEntitiesState({
  selectedId: null
});


// getEntities helper functions

export function getEntities(state: ClientStateModel, payload: Client[]): Partial<ClientStateModel> {
  return {
    ...state,
    entities: createEntities<Client>(payload, state),
    loading: false,
    loaded: true
  };
}
