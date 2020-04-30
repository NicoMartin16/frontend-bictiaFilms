import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Parent } from "../models/parent";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import swal from "sweetalert2";
import { Child } from '../models/child';

@Injectable({
  providedIn: "root",
})
export class ParentService {

  public currChildName: string = ''
  public currChildImg: string = ''

  private URLAPI = 'http://localhost:3000';
  private headers = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}

  constructor(private _http: HttpClient) { }

  createParent(parent: Parent): Observable<Parent>{
    return this._http.post<any>(`${this.URLAPI}/parent`, parent, this.headers).pipe(
      map(res => res.message as Parent),
      catchError(e => {
        if(e.status == 400) {
          return throwError(e);
        }
        swal.fire({
          title: 'Error al registrar el usuario',
          icon: 'error'
        });
        return throwError(e);
      })
    );
  }

  getParents() {
    return this._http
      .get(`${this.URLAPI}/parent`)
      .pipe((res) => res);
  }

  getAdmins() {
    return this._http
      .get(`${this.URLAPI}/admin`)
      .pipe((res) => res);
  }

  createChild(child: Child) {
    return this._http.post<any>(`${this.URLAPI}/parent/createchild`,
      child,this.headers).pipe(
      map(res => res.message as Parent),
      catchError(e => {
        if(e.status == 400) {
          return throwError(e);
        }
        swal.fire({
          title: 'Error al registrar hijo',
          icon: 'error'
        });
        return throwError(e);
      })
    );
  }

  updatePW(id: string, password: Parent) {
    return this._http.patch<any>(`${this.URLAPI}/parent/editPass/${id}`,
      password,this.headers)
  }

  updateEmail(id: string, email: Parent) {
    return this._http.patch<any>(`${this.URLAPI}/parent/${id}`,
      email,this.headers)
  }

  getChild(id: string) {
    return this._http
      .get(`${this.URLAPI}/child/listParent/${id}`)
      .pipe((res) => res);
  }


  deleteChild(parent: number,child: number) {
    return this._http.delete(`${this.URLAPI}/parent/deleteChild/${parent}/${child}`,
    this.headers)
    .pipe((res) => res);
  }
}
