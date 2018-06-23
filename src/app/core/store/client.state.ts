import { map, catchError } from 'rxjs/operators';
import { LoadClient, LoadClientSuccess, LoadClientFail, SelectClient } from './client.actions';
import { DataService } from './../services/data.service';
import { Payload, DataApi } from './../models/data-api';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { RouterState, RouterStateModel } from './router.state';

interface EntityState<V> {
  ids: string[] | number[];
  entities: { [id: string]: V };
}

export interface ClientStateModel extends EntityState<Payload> {
  loading: boolean;
  failed: boolean;
  selectedClientId: string | number;
}

@State<ClientStateModel>({
  name: 'Client',
  defaults: {
    ids: [],
    entities: {},
    loading: false,
    failed: false,
    selectedClientId: null
  }
})

export class ClientState {
  @Selector() static getAllClient(state: ClientStateModel) {
    return Object.values(state.entities);
  }

  @Selector([RouterState]) static getSelectedClient(state: ClientStateModel, router: RouterStateModel) {
    return router && state.entities[router.params.clientId];
  }

  @Selector() static isLoading(state: ClientStateModel) {
    return state.loading;
  }

  @Selector() static getClientEntities(state: ClientStateModel) {
    return state.entities;
  }

  @Selector() static getSelected(state: ClientStateModel) {
    return Object.keys(state.entities)
      .map(id => state.entities[id])
      .find(
        (client: Payload) => client.id === state.selectedClientId
    );
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
        catchError(err => of(new LoadClientFail(err)))
      );
  }

  @Action(LoadClientSuccess)
  loadClientSuccess({ getState, patchState }: StateContext<ClientStateModel>, { payload }: LoadClientSuccess) {
    const state = getState();
    const enitites = arrayToObject(payload, state, 'id');
    const ids = payload.map(pay => pay.id);
    console.log('ids[]', ids);
    patchState({
      ...state,
      loading: false,
      entities: enitites,
      ids
    });
  }

  @Action(LoadClientFail)
  loadClientFail({ getState, patchState }: StateContext<ClientStateModel>, { payload }: LoadClientFail) {
    const state = getState();
    patchState({
      ...state,
      loading: false,
      failed: true,
    });
  }

  @Action(SelectClient)
  ActionName({ getState, patchState }: StateContext<ClientStateModel>, { payload }: SelectClient) {
    const state = getState();
    patchState({
      ...state,
      selectedClientId: payload
    });
  }

  //#endregion;
}

const arrayToObject = (array, state, keyField) =>
  array.reduce((obj, item) => {
    return {
      ...obj,
      [item[keyField]]: item
    };
  },
    {
      ...state.obj
    });
