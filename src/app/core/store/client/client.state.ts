import { ParamMap } from '@angular/router';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client, DataApi } from '../../models/data-api';
import { DataService } from '../../services/data.service';
import { RouterState, RouterStateModel } from '../router/router.state';
import { EntityState } from './../utils/entity.types';
import { LoadClient, LoadClientError, LoadClientSuccess, SelectClient } from './client.actions';
import { ClientStateModel } from './client.state';
import { getEntities, initialState } from './client.utils';

export interface ClientStateModel extends EntityState<Client> {
  selectedId: string | number;
}

@State<ClientStateModel>({
  name: 'Client',
  defaults: initialState
})

export class ClientState {

  @Selector() static getAllClient(state: ClientStateModel) {
    return Object.values(state.entities);
  }

  @Selector([RouterState]) static getSelectedClient(state: ClientStateModel, router: RouterStateModel) {
    return state.entities[router.paramMap.get('clientId')];
  }

  static selectedClient() {
    return createSelector([ClientState.getClientEntities, RouterState.getRouterParams],
      (client: Client, router: ParamMap) => client[router.get('clientId')]
    );
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
        catchError(err => of(dispatch(new LoadClientError(err))))
      );
  }

  @Action(LoadClientSuccess)
  loadClientSuccess({ getState, patchState }: StateContext<ClientStateModel>, { payload }: LoadClientSuccess) {
    const state = getState();
    patchState(getEntities(state, payload));
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