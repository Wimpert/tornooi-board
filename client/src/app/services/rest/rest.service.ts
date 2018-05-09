import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import { map, catchError } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RestService {

  constructor(private  http : HttpClient) { }

  public doGet(url : string): Observable<any> {
    return this.http.get(url);
  }

  public doPost(url : string, body? :any): Observable<any> {
    const  headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post(url,body, {withCredentials:true, headers:headers});
  }

  public doPut(url : string, body? :any): Observable<any> {
    console.log(JSON.stringify(body));
    const  headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.put(url,body, {withCredentials:true, headers: headers});
  }

/*

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }*/
}
