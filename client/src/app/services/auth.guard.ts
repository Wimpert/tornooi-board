import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {map, tap} from "rxjs/operators";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}


  canActivate(): Observable<boolean> {
    return this.userService.userIsLoggedIn$.pipe(
      tap(value => {if(!value){
        this.router.navigate(['/']);
    }}),
      map(value => value)
    )

  }
}

