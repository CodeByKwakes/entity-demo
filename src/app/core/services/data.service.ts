import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payload } from '../models/data-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly URL = 'https://cms.holition.com/staging/client';

  constructor(private http: HttpClient) { }

  // Create Item
  create(client: Payload): Observable<Payload> {
    return this.http.post<Payload>(this.URL, client);
  }
  // Delete Item
  delete(client: Payload): Observable<Payload> {
    return this.http.delete<Payload>(`${this.URL}/${client.id}`);
  }

  // Get Item

  get(id: string): Observable<Payload> {
    return this.http.get<Payload>(`${this.URL}/${id}`);
  }
  // Get List
  list(): Observable<Payload[]> {
    return this.http.get<Payload[]>(this.URL);
  }
  // Update Item
  update(client: Payload): Observable<Payload> {
    return this.http.put<Payload>(`${this.URL}/${client.id}`, client);
  }
}
