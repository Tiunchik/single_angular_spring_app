import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/login/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    let param = new HttpParams();
    param = param.append('login', credentials.login);
    param = param.append('password', credentials.password);
    return this.http.post(AUTH_API, param, httpOptions);
  }

}
