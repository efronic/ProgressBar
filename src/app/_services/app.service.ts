import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { Observable, of } from 'rxjs';
import { Structure } from '../_models/structure';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = environment.apiUrl;
  structure: Structure;

  constructor(private http: HttpClient) {}

  getStructure(): Observable<Structure> {
    return this.http.get<Structure>(this.baseUrl);
  }
}
