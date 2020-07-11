import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { Structure } from '../_models/structure';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = environment.apiUrl;
  baseStructure: Structure;
  constructor(private http: HttpClient) {}
  getStructure(): Observable<Structure> {
    console.log('baseurl', this.baseUrl);

    return this.http.get<any>(this.baseUrl);
    // temp.subscribe(p=>{...this.baseStructure,p})
  }
}
