import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserResponse, UsersResponse } from "../interfaces/User";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private apiService: ApiService
  ) {}

  getUsers(
    pageIndex: number = 0,
    pageSize: number = 0
  ): Observable<UsersResponse> {
    return this.apiService.get(
      `/users`,
      new HttpParams()
        .set("page", pageIndex + 1)
        .set("per_page", pageSize)
    )
  }

  getUser(
    id: number = 0
  ): Observable<UserResponse> {
    return this.apiService.get(`/users/${id}`)
  }

}