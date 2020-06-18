import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {DBConstat} from "../constants/dbconstat";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = DBConstat.dbURL;

  constructor(private http: HttpClient) {
  }

  login(emp: Employee): Observable<any> {
    const url = this.url + 'login/';
    console.log(url);
    return this.http.post(url,
      JSON.stringify({'login': emp.login, 'password': emp.password}),
      httpOptions);
  }

}
