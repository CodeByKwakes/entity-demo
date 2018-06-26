import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/data-api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly URL = 'https://cms.holition.com/staging/client';

  constructor(private http: HttpClient) { }

  // Create Item
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.URL, client)
      .pipe(
        catchError(error => throwError(error.json()))
      );
  }
  // Delete Item
  delete(client: Client): Observable<Client> {
    return this.http.delete<Client>(`${this.URL}/${client.id}`)
      .pipe(
        catchError(error => throwError(error.json()))
      );
  }

  // Get Item

  get(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.URL}/${id}`)
      .pipe(
        catchError(error => throwError(error.json()))
      );
  }
  // Get List
  list(): Observable<Client[]> {
    return this.http.get<Client[]>(this.URL)
      .pipe(
        catchError(error => throwError(error.json()))
      );
  }
  // Update Item
  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.URL}/${client.id}`, client)
      .pipe(
        catchError(error => throwError(error.json()))
      );
  }
}
