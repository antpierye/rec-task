import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, pluck } from "rxjs";
import { User } from "../interfaces/User";
import { UsersService } from "../services/users.service";

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.usersService.getUser(route.params['id'])
      .pipe(
        pluck("data"),
        catchError((err) => this.router.navigate(['404']))
      )

  }

}