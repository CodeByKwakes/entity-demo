import { Payload } from './../models/data-api';
export class LoadClient {
  static readonly type = '[Client] Load Client';
}

export class LoadClientSuccess {
  static readonly type = '[Client] Load Client Success';
  constructor(public readonly payload: Payload[]) { }
}

export class LoadClientFail {
  static readonly type = '[Client] Load Client Fail';
  constructor(public readonly payload?: any) { }
}
