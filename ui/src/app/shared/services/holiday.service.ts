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

  getById(id): Observable<Holiday> {
    const url = this.url + 'api/holiday/' + id;
    return this.http.get <Holiday>(url);
  }

  getByEmployeeId(id): Observable<Holiday[]> {
    const url = this.url + 'api/holiday/employee/' + id;
    return this.http.get<Holiday[]>(url);
  }


  get(): Observable<Holiday[]> {
    const url = this.url + 'api/holiday/';
    let params = new HttpParams();
    return this.http.get<Holiday[]>(url);
  }

  save(holi: Holiday) {
    const url = this.url + 'api/holiday/';
    return this.http.post(url, holi);
  }

  update(holi: Holiday) {
    const url = this.url + 'api/holiday/';
    return this.http.put(url, holi);
  }

  delete(id) {
    const url = this.url + 'api/holiday/' + id;
    return this.http.delete(url);
  }
}
