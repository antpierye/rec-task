import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UtilsService } from "./utils.service";

const API_URL: string = "https://reqres.in/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${API_URL}${path}`, { params })
      .pipe(
        catchError(err => {
          this.utilsService.showSnackBar(err.message, 'warning-snack-bar');
          return throwError(() => err)
        })
      );
  }

  // TODO
  post() {}

  // TODO
  put() {}

  // TODO
  delete() {}

}