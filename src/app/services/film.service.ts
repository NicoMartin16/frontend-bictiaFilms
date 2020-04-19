import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FilmService {
    apiURL = 'http://localhost:3000/api';
    private _token = JSON.parse(localStorage.getItem('token'));
    private headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

    createSong(film) {
        const body = JSON.stringify(film);
        return this.http
            .post(`${this.apiURL}/music/create`, body, this.headers)
            .pipe((res) => res);
    }
}
