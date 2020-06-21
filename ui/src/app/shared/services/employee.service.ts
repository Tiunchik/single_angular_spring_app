import {Injectable} from '@angular/core';
import {DBConstat} from "../constants/dbconstat";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private url = DBConstat.dbURL;

  constructor(private http: HttpClient) {
  }

  getById(id): Observable<Employee> {
    const url = this.url + 'api/employee/' + id;
    return this.http.get<Employee>(url);
  }

  get(): Observable<Employee[]> {
    const url = this.url + 'api/employee/';
    let params = new HttpParams();
    return this.http.get<Employee[]>(url);
  }

  save(emp: Employee): Observable<Employee> {
    const url = this.url + 'api/employee/';
    let params = new HttpParams();
    return this.http.post<Employee>(url, emp);
  }

  update(emp: Employee) {
    const url = this.url + 'api/employee/';
    let params = new HttpParams();
    return this.http.put(url, emp);
  }

  delete(id): Observable<void> {
    const url = this.url + 'api/holiday/' + id;
    return this.http.delete<void>(url);
  }
}
