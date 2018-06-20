import { map, catchError } from 'rxjs/operators';
import { LoadClient, LoadClientSuccess, LoadClientFail, SelectClient } from './client.actions';
import { DataService } from './../services/data.service';
import { Payload, DataApi } from './../models/data-api';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { RouterState, RouterStateModel } from './router.state';

export interface ClientStateModel {
  list: Payload[];
  entities: { [id: number]: Payload };
  loading: boolean;
  failed: boolean;
  selectClienId: string;
}

@State<ClientStateModel>({
  name: 'Client',
  defaults: {
    list: [],
    entities: {},
    loading: false,
    failed: false,
    selectClienId: null
  }
})

export class ClientState {
  @Selector() static getAllClient(state: ClientStateModel) {
    return Object.keys(state.entities).map(id => state.entities[id]);
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
        (client: Payload) => client.id === state.selectClienId
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
    const clients = payload;

    const enitites = clients.reduce(
      // tslint:disable-next-line:no-shadowed-variable
      (enitites: { [id: number]: Payload }, client: Payload) => {
        return {
          ...enitites,
          [client.id]: client
        };
      },
      {
        ...state.entities
      }
    );
    patchState({
      ...state,
      loading: false,
      failed: false,
      entities: enitites
      // list: payload,
    });
  }

  @Action(LoadClientFail)
  loadClientFail({ getState, patchState }: StateContext<ClientStateModel>, { payload }: LoadClientFail) {
    const state = getState();
    patchState({
      ...state,
      loading: false,
      failed: true,
      list: [],
    });
  }

  @Action(SelectClient)
  ActionName({ getState, patchState }: StateContext<ClientStateModel>, { payload }: SelectClient) {
    const state = getState();
    patchState({
      ...state,
      selectClienId: payload,
    });
  }

  //#endregion;
}
