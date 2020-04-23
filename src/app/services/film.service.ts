import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Film } from '../models/film';
import { map } from "rxjs/operators";

@Injectable()
export class FilmService {
    apiURL = "http://localhost:3000";
    private _token = JSON.parse(localStorage.getItem("token"));
    private headers = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(private http: HttpClient) {}

    createSong(film) {
        const body = JSON.stringify(film);
        return this.http
            .post(`${this.apiURL}/music/create`, body, this.headers)
            .pipe((res) => res);
    }

    getFilms(): Observable<Film[]> {
        return this.http.get<any>(`${this.apiURL}/film`).pipe(
            map(res => res.message as Film[])
        );
    }

    getFilmById(id): Observable<Film>{
        return this.http.get<any>(`${this.apiURL}/film?id=${id}`);
    }
}
