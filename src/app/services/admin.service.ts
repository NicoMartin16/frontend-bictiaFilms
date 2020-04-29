import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AdminService {
  apiURL = "http://localhost:3000";
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient) {}

  createAdmin(body) {
    const h = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
    return this.http.post(`${this.apiURL}/admin/createAdmin`, body, {headers: h})
      .pipe((res) => res);
  }
}
