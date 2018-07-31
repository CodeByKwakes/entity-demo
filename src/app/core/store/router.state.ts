import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';

// ------ Router Model -------
export interface RouterStateModel {
  url?: string;
  path?: any[];
  queryParams?: any;
  params?: any;
}

// ---- Router Action ------
export class RouterGo {
  static readonly type = '[Router] Go';
  constructor(public readonly payload: { path, queryParams?, extras?}) { }
}

export class RouterBack {
  static readonly type = '[Router] Back';
}

export class RouterForward {
  static readonly type = '[Router] Forward';
}

export class RouteChange {
  static readonly type = '[Router] Route Change';
  constructor(public payload: RouterStateModel) { }
}

@State<RouterStateModel>({
  name: 'Router'
})

export class RouterState {

  private activatedRoute: ActivatedRouteSnapshot;

  @Selector() static getRouterUrl(state: RouterStateModel) {
    return state.url;
  }

  @Selector() static getRouterParams(state: RouterStateModel) {
    return state.params;
  }

  constructor(
    private store: Store,
    private router: Router,
    private location: Location) {
    this.listenToRouter();
  }

  @Action(RouterGo)
  routerGo({ payload: { path, queryParams, extras } }: RouterGo) {
    this.router.navigate(path, { queryParams, ...extras });
  }

  @Action(RouteChange)
  routeChange({ setState }: StateContext<RouterStateModel>, { payload }: RouteChange) {
    setState(payload);
  }

  @Action(RouterForward)
  routerForward() { this.location.forward(); }

  @Action(RouterBack)
  routerBack() { this.location.back(); }

  private listenToRouter() {
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((routerState: ActivationEnd) => {
          let route = routerState.snapshot;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary')
      )
      .subscribe((route) => this.activatedRoute = route);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd ) => {
        const url = event.url;
        const { paramMap, queryParams, routeConfig: { path } } = this.activatedRoute;
        this.store.dispatch(new RouteChange({ params: paramMap, queryParams, url }));
      });
  }
}
