import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client, DataApi } from './../models/data-api';
import { DataService } from './../services/data.service';
import { LoadClient, LoadClientError, LoadClientSuccess, SelectClient } from './client.actions';
import { EntityState, createEntities, initialEntitiesState } from './entity.types';
import { RouterState, RouterStateModel } from './router.state';

export interface ClientStateModel extends EntityState<Client> {
  selectedId: string | number;
}

const initialState: ClientStateModel = initialEntitiesState({
  selectedId: null
});

@State<ClientStateModel>({
  name: 'Client',
  defaults: initialState
})

export class ClientState {

  @Selector() static getAllClient(state: ClientStateModel) {
    return Object.values(state.entities);
  }

  @Selector([RouterState]) static getSelectedClient(state: ClientStateModel, router: RouterStateModel) {
    return router && state.entities[router.params.get('clientId')];
  }

  @Selector() static isLoading(state: ClientStateModel) {
    return state.loading;
  }

  @Selector() static hasLoaded(state: ClientStateModel) {
    return state.loaded;
  }

  @Selector() static getClientEntities(state: ClientStateModel) {
    return state.entities;
  }

  @Selector() static getSelected(state: ClientStateModel) {
    return state.entities[state.selectedId];
  }

  constructor(private api: DataService) { }

  //#region ---- Load List State ----
  @Action(LoadClient)
  loadClient({ getState, patchState, dispatch }: StateContext<ClientStateModel>) {
    const state = getState();
    patchState({
      ...state,
      loading: true
    });
    return this.api.list()
      .pipe(
        map((response: DataApi) => dispatch(new LoadClientSuccess(response.data.payload))),
        catchError(err => of(
          dispatch(new LoadClientError(err))
        ))
      );
  }

  @Action(LoadClientSuccess)
  loadClientSuccess({ getState, patchState }: StateContext<ClientStateModel>, { payload }: LoadClientSuccess) {
    const state = getState();
    const entities = createEntities<Client>(payload, state);

    patchState({
      ...state,
      entities,
      loading: false,
      loaded: true
    });
  }

  @Action(LoadClientError)
  loadClientFail({ getState, patchState }: StateContext<ClientStateModel>, { payload }: LoadClientError) {
    const state = getState();
    patchState({
      ...state,
      loading: false,
      error: payload
    });
  }

  @Action(SelectClient)
  ActionName({ getState, patchState }: StateContext<ClientStateModel>, { payload }: SelectClient) {
    const state = getState();
    patchState({
      ...state,
      selectedId: payload
    });
  }

  //#endregion;
}
