import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoadClient } from '../../core/store/client.actions';
import { ClientState } from '../../core/store/client.state';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private store: Store) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkStore()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
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
