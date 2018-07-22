export interface DataApi {
  data: Data;
  status: number;
  error: boolean;
  message: Message;
}

export interface Data {
  payload: Client[];
  page: Page;
}

export interface Page {
  current: number;
  length: number;
}

export interface Client {
  id: string;
  meta: Meta;
}

export interface Meta {
  id: string;
  name: string;
  client: null;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: any[];
}

export interface Message {
  full: string;
  simple: string;
}
