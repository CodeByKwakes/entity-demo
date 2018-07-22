import { Client } from './../models/data-api';
export class LoadClient {
  static readonly type = '[Client] Load Client';
}

export class LoadClientSuccess {
  static readonly type = '[Client] Load Client Success';
  constructor(public readonly payload: Client[]) { }
}

export class LoadClientFail {
  static readonly type = '[Client] Load Client Fail';
  constructor(public readonly payload?: any) { }
}

export class SelectClient {
  static readonly type = '[Client] Select Client';
  constructor(public readonly payload: string | number) { }
}
