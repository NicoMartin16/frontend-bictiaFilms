import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parent } from '../models/parent';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private URLAPI = 'http://localhost:3000';
  private headers = new HttpHeaders()
                        .set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) { }

  createParent(parent: Parent): Observable<Parent>{
    return this._http.post<any>(`${this.URLAPI}/parent`, parent, {headers: this.headers}).pipe(
      map(res => res.message as Parent)
    );
  }


}
