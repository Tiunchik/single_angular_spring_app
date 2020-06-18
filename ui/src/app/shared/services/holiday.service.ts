import {Injectable} from '@angular/core';
import {DBConstat} from "../constants/dbconstat";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {Holiday} from "../models/holiday";

@Injectable({
  providedIn: 'root'
})
export class HolidayService {


  private url = DBConstat.dbURL;

  constructor(private http: HttpClient) {
  }

  getById(id): Observable<Holiday[]> {
    const url = this.url + 'api/holiday/' + id;
    return this.http.get<Holiday[]>(url);
  }

  get(): Observable<Holiday[]> {
    const url = this.url + 'api/holiday/';
    let params = new HttpParams();
    return this.http.get<Holiday[]>(url);
  }

  save(holi: Holiday) {
    const url = this.url + 'api/holiday/';
    let params = new HttpParams();
    params = params.append('employee', String(holi.employee.id));
    params = params.append('start', String(holi.start.getTime()));
    params = params.append('finish', String(holi.finish.getTime()));
    return this.http.put(url, params);
  }

  update(holi: Holiday) {
    const url = this.url + 'api/holiday/' + holi.id;
    let params = new HttpParams();
    params = params.append('id', String(holi.id));
    params = params.append('employee', String(holi.employee.id));
    params = params.append('start', String(holi.start.getTime()));
    params = params.append('finish', String(holi.finish.getTime()));
    return this.http.put(url, params);
  }

  delete(id) {
    const url = this.url + 'api/holiday/' + id;
    return this.http.delete(url);
  }
}
