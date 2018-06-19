import { map, catchError } from 'rxjs/operators';
import { LoadClient, LoadClientSuccess, LoadClientFail } from './client.actions';
import { DataService } from './../services/data.service';
import { Payload, DataApi } from './../models/data-api';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';

export interface ClientStateModel {
  list: Payload[];
  loading: boolean;
  failed: boolean;
}

@State<ClientStateModel>({
  name: 'Client',
  defaults: {
    list: [],
    loading: false,
    failed: false,
  }
})

export class ClientState {
  @Selector() static getAllClient(state: ClientStateModel) {
    return state.list;
  }

  @Selector() static isLoading(state: ClientStateModel) {
    return state.loading;
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
    patchState({
      ...state,
      loading: false,
      failed: false,
      list: payload,
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
  //#endregion;
}
