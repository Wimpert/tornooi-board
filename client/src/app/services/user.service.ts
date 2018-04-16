import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../api/src/models/User";
import {catchError, map, merge, share, shareReplay, startWith, switchMap, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {COOKIE_NAME} from "../../../../api/src/models/Constants";
import "rxjs/add/observable/of";

@Injectable()
export class UserService {

  private _baseUrl : string  = environment.apiUrl;

  userIsLoggedIn$ : Observable<boolean>;
  userLoginFailedMessage$: Subject<any> = new Subject<any>();
  userSignUpFailedMessage$: Subject<any> = new Subject<any>();

  private loginRequest$ : Subject<any> = new Subject<any>();
  private logoutRequest$ : Subject<any> = new Subject<any>();
  private userCreateRequest$ :Subject<User> = new Subject<User>();
  private userLoggedIn$ : Observable<boolean>;
  private userLoggedOut$ : Observable<boolean>;
  private userCreated$ : Observable<boolean>;
  private unauthorizedResponse$ :  Subject<boolean> = new Subject<boolean>();

  constructor(private  _httpClient : HttpClient) {

    //TODO: this should not stop on error !:
    this.userLoggedIn$ = this.loginRequest$.pipe(
      switchMap(body =>
        this._httpClient.post<User>(this._baseUrl + "login", body ,{withCredentials:true}).pipe(
          catchError(error => {
            if(error.error && error.error.code){
              this.userLoginFailedMessage$.next(error.error);
            } else {
              this.userLoginFailedMessage$.next(error);
            }
            return  Observable.of(new User());
          }),
          map(value => {
            return value.id !== undefined;
          })
        )
      ),
      share()
    );

    this.userCreated$ = this.userCreateRequest$.pipe(
      switchMap(user =>
        this._httpClient.post<User>(this._baseUrl+"signup",user,{withCredentials:true}).pipe(
          catchError(error => {
            if(error.error && error.error.code){
              this.userSignUpFailedMessage$.next(error.error);
            } else {
              this.userSignUpFailedMessage$.next(error);
            }
            return  Observable.of(new User());
          }),
          tap(user => console.log(user)),
          map(user => {
            return user.id !== undefined;
          })
        )
      ),
      share()
    );

    this.userLoggedOut$ = this.logoutRequest$.pipe(
      switchMap(_ =>
        this._httpClient.get<boolean>(this._baseUrl+"logout",{withCredentials:true})
      ),
      share()
    );

    this.userIsLoggedIn$ = this.userLoggedIn$.pipe(
      merge(this.userLoggedOut$.pipe(
        map(value => !value)
      )),
      merge(this.userCreated$),
      merge(this.unauthorizedResponse$.pipe(
        map(value => !value)
      )),
      startWith(document.cookie.indexOf(COOKIE_NAME) >= 0),
      shareReplay(1)
    );
  }

  login(username:string, password:string, remember = false) {
    this.loginRequest$.next({username:username, password: password, remember: remember});
  }

  logout() {
    this.logoutRequest$.next( "logout");
  }

 /* getPronostiek() : Observable<Pronostiek> {
    return this._httpClient.get<Pronostiek>(this._baseUrl + "pronostiek", {withCredentials:true});
  }

  savePronostiek(pronostiek : Pronostiek) : Observable<Pronostiek> {
    return this._httpClient.post<Pronostiek>(this._baseUrl+"pronostiek" , pronostiek , {withCredentials:true});
  }*/

  createUser(user: User) {
    this.userCreateRequest$.next(user);
  }



}
