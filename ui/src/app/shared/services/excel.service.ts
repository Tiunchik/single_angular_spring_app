import {Injectable} from '@angular/core';
import {DBConstat} from "../constants/dbconstat";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private url = DBConstat.dbURL;

  constructor(private http: HttpClient) {
  }

  download() {
    const url = this.url + 'api/excel/download';
    return this.http.get(url, {responseType: 'blob'});
  }
}
