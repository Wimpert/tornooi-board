import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RestService {

  constructor(private  http : Http) { }

  public doGet(url : string): Observable<any> {
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public doPost(url : string, body :any): Observable<any> {
    return this.http.post(url,body).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public doPut(url : string, body :any): Observable<any> {
    return this.http.put(url,body, {withCredentials:true}).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || body.data || {};
  }

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
  }
}
