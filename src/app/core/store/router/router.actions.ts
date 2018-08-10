import { RouterStateModel } from './router.state';

// ---- Router Action ------
export class RouterGo {
  static readonly type = '[Router] Go';
  constructor(public readonly payload: {
    path;
    queryParamMap?;
    extras?;
  }) { }
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
