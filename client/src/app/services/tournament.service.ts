import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Tournament} from "../../../../api/src/models/Tournament";
import {environment} from "../../environments/environment";
import {of} from "rxjs/observable/of";
import {map} from "rxjs/operators";
import {Group} from "../../../../api/src/models/Group";

@Injectable()
export class TournamentService {

  private _baseUrl : string  = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllTournaments(): Observable<Tournament[]> {
    return this.httpClient.get<Tournament[]>(this._baseUrl+"tournament",{withCredentials:true})
  }

  createNewTournament(): Observable<Tournament> {
    return this.httpClient.put<Tournament>(this._baseUrl+"tournament/new", null, {withCredentials: true}).pipe(
      map((tournament) => {
        tournament.data.groups = tournament.data.groups.map((groupFromServer)=>  new Group().deserialize(groupFromServer));
        tournament.data.groups.forEach((group) => console.log(group));
        return tournament;
      })
    );
  }

  saveTournament(tournament: Tournament): Observable<Tournament> {
    return this.httpClient.put<Tournament>(this._baseUrl+"tournament", tournament, {withCredentials: true}).pipe(
      map((tournament) => {
        tournament.data.groups = tournament.data.groups.map((groupFromServer)=>  new Group().deserialize(groupFromServer));
        tournament.data.groups.forEach((group) => console.log(group));
        return tournament;
      })
    );;
  }



  getTournament(id:number) : Observable<Tournament> {
    return this.httpClient.get<Tournament>(this._baseUrl+"tournament/"+id, {withCredentials:true}).pipe(
      map((tournament) => {
        tournament.data.groups = tournament.data.groups.map((groupFromServer)=>  new Group().deserialize(groupFromServer));
        /*newGroups.forEach((group) => console.log(group))*/
        tournament.data.groups.forEach((group) => console.log(group));
        return tournament;
      })
    );
  }

}
