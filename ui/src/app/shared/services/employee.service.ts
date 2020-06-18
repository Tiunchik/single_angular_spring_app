import { Injectable } from '@angular/core';
import {DBConstat} from "../constants/dbconstat";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {Holiday} from "../models/holiday";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private url = DBConstat.dbURL;

  constructor(private http: HttpClient) {
  }

  getById(id): Observable<Employee[]> {
    const url = this.url + 'api/employee/' + id;
    return this.http.get<Employee[]>(url);
  }

  get(): Observable<Employee[]> {
    const url = this.url + 'api/employee/';
    let params = new HttpParams();
    return this.http.get<Employee[]>(url);
  }

  save(emp: Employee) {
    const url = this.url + 'api/employee/';
    let params = new HttpParams();
    params = params.append('name', String(emp.name));
    params = params.append('patronim', String(emp.patronim));
    params = params.append('surname', String(emp.surname));
    params = params.append('born', String(emp.born.getTime()));
    params = params.append('post', String(emp.post));
    params = params.append('start', String(emp.start.getTime()));
    params = params.append('login', String(emp.login));
    params = params.append('password', String(emp.password));
    params = params.append('rights', String(emp.rights));
    return this.http.put(url, params);
  }

  update(emp: Employee) {
    const url = this.url + 'api/employee/';
    let params = new HttpParams();
    params = params.append('id', String(emp.id));
    params = params.append('name', String(emp.name));
    params = params.append('patronim', String(emp.patronim));
    params = params.append('surname', String(emp.surname));
    params = params.append('born', String(emp.born.getTime()));
    params = params.append('post', String(emp.post));
    params = params.append('start', String(emp.start.getTime()));
    params = params.append('login', String(emp.login));
    params = params.append('password', String(emp.password));
    params = params.append('rights', String(emp.rights));
    return this.http.put(url, params);
  }

  delete(id) {
    const url = this.url + 'api/holiday/' + id;
    return this.http.delete(url);
  }
}
