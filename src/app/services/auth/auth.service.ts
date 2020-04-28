import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/';
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public activeNav: Boolean = false;
  public admin: Boolean = false;
  public user: Boolean = false;


  constructor(private http: HttpClient, private router: Router) { }

  getUser() {
    return this.http.get(this.url);
  }

  createUser(user) {
    return this.http.post(this.url, user);
  }

  adminLogin(admin: any) {
    return this.http.post<any>(this.url + 'admin/login',
      admin,
      this.headers
    );
  }

  parseJwt(token: any) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
  }

  validateRole(role: string) {

    switch (role) {
      case 'ROL_ADMIN':
        return true
      case 'ROL_PARENT':
        return false
      default:
        break;
    }
  }
}
