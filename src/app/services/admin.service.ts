import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AdminService {
  private apiURL = "http://localhost:3000";
  private headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    })

  constructor(private http: HttpClient) {}

  createAdmin(body) {
    return this.http.post(`${this.apiURL}/admin`, body, {headers: this.headers})
      .pipe((res) => res);
  }
}
