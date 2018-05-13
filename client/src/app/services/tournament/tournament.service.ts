import { TournamentData } from './../../../../../api/src/models/TournamentData';
import { Tournament } from './../../../../../api/src/models/Tournament';
import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {RestService} from "../rest/rest.service";
import {SettingsService} from "../settings/settings.service";
import {map} from "rxjs/operators";

@Injectable()
export class TournamentService {



  constructor(private settingsService : SettingsService , private  restService : RestService) { }

  //public getBaseUrl() : string { return this.settingsService.backendUrl; }
  public getBaseUrl() : string { return "http://192.168.0.128:8888/api/"; }
  private getTournamentUrl()  :  string { return this.getBaseUrl() + "tournament"; }
  private getAllTournamentsUrl()  : string { return this.getBaseUrl() + "tournament"; }
  private newTournamentUrl()  : string { return this.getBaseUrl() +"tournament/new"; }
  private updateTournamentUrl()  : string { return this.getBaseUrl() +"tournament"; }

  public getTournament(id : string): Observable<any> {
    if(id){
      return this.restService.doGet(this.getTournamentUrl()+"/"+id).pipe(
        map( tournament =>  {
          tournament.data = TournamentData.deserialize(tournament.data);
          return tournament;
        }));
    } else {
      return new Observable((observer: Observer<Tournament>)  => observer.next(new Tournament()));
    }
  }

  public getAllTournaments(): Observable<any> {
    return this.restService.doGet(this.getAllTournamentsUrl());
  }

  public newTournament(): Observable<any> {
    return this.restService.doPost(this.newTournamentUrl());
  }

  public saveTournament(tour: Tournament): Observable<any> {
    return this.restService.doPost(this.updateTournamentUrl(), tour);
  }

}
