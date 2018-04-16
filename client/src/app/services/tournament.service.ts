import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Tournament} from "../../../../api/src/models/Tournament";
import {environment} from "../../environments/environment";

@Injectable()
export class TournamentService {

  private _baseUrl : string  = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllTournaments(): Observable<Tournament[]>{
    return this.httpClient.get<Tournament[]>(this._baseUrl+"tournament",{withCredentials:true})
  }

  //getTournament(id:string)

}
