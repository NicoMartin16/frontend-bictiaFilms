import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Film } from "../models/film";
import { map } from "rxjs/operators";

@Injectable()
export class FilmService {
  apiURL = "http://localhost:3000";
  private token = localStorage.getItem("token");
  private headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  createFilm(body) {
    return this.http.post(`${this.apiURL}/film`, body)
      .pipe((res) => res);
  }

  getFilms(): Observable<Film[]> {
    return this.http
      .get<any>(`${this.apiURL}/film`)
      .pipe(map((res) => res.message as Film[]));
  }
}
