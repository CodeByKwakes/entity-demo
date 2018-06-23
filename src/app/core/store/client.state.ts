import { map, catchError } from 'rxjs/operators';
import { LoadClient, LoadClientSuccess, LoadClientFail } from './client.actions';
import { DataService } from './../services/data.service';
import { Payload, DataApi } from './../models/data-api';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { RouterState, RouterStateModel } from './router.state';

interface EntityState<V> {
  ids: string[] | number[];
  entities: { [id: string ]: V };
}

export interface ClientStateModel extends EntityState<Payload> {
  // list: Payload[];
  // entities: { [id: number]: Payload };
  loading: boolean;
  failed: boolean;
}

@State<ClientStateModel>({
  name: 'Client',
  defaults: {
    ids: [],
    entities: {},
    loading: false,
    failed: false,
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

    const ids = state.ids.slice(0);
    console.log('ids[]', ids);
    const enitites = payload.reduce(
      // tslint:disable-next-line:no-shadowed-variable
      (enitites: { [id: number]: Payload }, item: Payload) => {
        return {
          ...enitites,
          [item.id]: item
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
      entities: enitites,
      ids: [],
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
  //#endregion;
}
