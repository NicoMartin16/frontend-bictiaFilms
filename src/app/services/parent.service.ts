import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Parent } from "../models/parent";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class ParentService {
  private URLAPI = "http://localhost:3000";
  private headers = new HttpHeaders().set("Content-Type", "application/json");
  constructor(private _http: HttpClient) {}

  createParent(parent: Parent): Observable<Parent> {
    return this._http
      .post<any>(`${this.URLAPI}/parent`, parent, {
        headers: this.headers,
      })
      .pipe(
        map((res) => res.message as Parent),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          swal.fire({
            title: "Error en la peticion",
            text: e.error.error,
            icon: "error",
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
}
