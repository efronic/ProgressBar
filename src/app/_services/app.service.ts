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
    console.log('baseurl', this.baseUrl);

    return this.http.get<any>(this.baseUrl);
  }


  // getStructure(): Observable<Structure> {
  //   console.log('baseurl', this.baseUrl);

  //   this.http.get<any>(this.baseUrl).subscribe((p) => {
  //     for (let index = 0; index < p.bars.length; index++) {
  //       this.bars.push({ id: index, value: p.bars[index] });
  //     }
  //     for (let index = 0; index < p.buttons.length; index++) {
  //       this.buttons.push({ id: index, value: p.buttons[index] });
  //     }
  //     this.structure = {} as Structure;
  //     this.structure.bars= this.bars;
  //     this.structure.buttons = this.buttons;
  //     this.structure.limit = p.limit;

  //   });
  //   const temp = of(this.structure);
  //   return temp;
  //   // temp.subscribe(p=>{...this.baseStructure,p})
  // }
}
