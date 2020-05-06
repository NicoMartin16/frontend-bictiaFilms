import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Child } from '../models/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private apiURL = "http://localhost:3000";
  private headers = new HttpHeaders()
                    .set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  addFav(idChild, idFilm): Observable<any>{
    return this._http.patch(`${this.apiURL}/child/addFavFilm/${idChild}`, {favFilm: idFilm}, {headers: this.headers}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        swal.fire({
          title: 'Error al registrar pelicula favorita',
          icon: 'error'
        });
        return throwError(e);
      })
    );
  }

  getChildById(id: any): Observable<Child>{
    return this._http.get<any>(`${this.apiURL}/child/childbyid/${id}`).pipe(
      map(res => res.message as Child)
    );
  }
  
}
