import { Client } from './../../core/models/data-api';
import { LoadClient, SelectClient } from './../../core/store/client.actions';
import { switchMap, take, map } from 'rxjs/operators';
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
          return this.hasClient(id);
        })
      );
  }

  // hasClient(id: number | string): Observable<boolean> {
  //   return this.store.select(ClientState.getAllClient).pipe(
  //     map((clients: Client[]) => clients.find(client => client.id === id)),
  //     switchMap(client => {
  //       if (!!client) {
  //         return this.store
  //           .dispatch(new SelectClient(client.id))
  //           .pipe(switchMap(() => of(true)));
  //       }
  //       return of(false);
  //     })
  //   );
  // }

  hasClient(id: number | string): Observable<boolean> {
    return this.store.select(ClientState.getAllClient).pipe(
      map((entities: { [key: number]: Client }) => !!entities[id]),
      rxjsDebug(2, 'has client value'),
      take(1)
      // switchMap(client => {
      //   if (!!client) {
      //     return this.store
      //       .dispatch(new SelectClient(client.id))
      //       .pipe(switchMap(() => of(true)));
      //   }
      //   return of(false);
      // })
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(ClientState.hasLoaded)
      .pipe(
        switchMap((loaded: boolean) => {
          if (!loaded) {
            this.store.dispatch(new LoadClient());
          }
          return of(true);
        }),
        take(1)
      );
  }
}
