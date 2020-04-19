import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'http://localhost:3000/user'

  constructor(private http: HttpClient,
    private router: Router) { }

  getUser() {
    return this.http.get(this.url)
  }

  createUser(user) {
    return this.http.post(this.url, user)
  }

  login(user) {
    return this.http.post<any>(this.url + '/login', user)
  }
}