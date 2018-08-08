import { Client } from './../../core/models/data-api';
import { LoadClient, SelectClient } from './../../core/store/client.actions';
import { switchMap, take, map, filter, tap } from 'rxjs/operators';
import { ClientState } from './../../core/store/client.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { rxjsDebug } from '../../core/utils/rxjs-debug';

@Injectable({
  providedIn: 'root'
})
export class ClientExistsGuard implements CanActivate {

  constructor(private store: Store) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkStore()
      .pipe(
        switchMap(() => {
          const id = route.paramMap.get('clientId');
          this.store.dispatch(new SelectClient(id));
          return this.hasClient(id);
        })
      );
  }

  hasClient(id: number | string): Observable<boolean> {
    return this.store.select(ClientState.getClientEntities).pipe(
      map((entities: { [key: number]: Client }) => !!entities[id]),
      rxjsDebug(2, 'has client value'),
      take(1)
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(ClientState.hasLoaded)
      .pipe(
        tap((loaded: boolean) => {
          if (!loaded) {
            this.store.dispatch(new LoadClient());
          }
        }),
        filter(loaded => loaded),
        take(1)
      );
  }
}
