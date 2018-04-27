import { Tournament } from './../../../../../api/src/models/Tournament';
import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {RestService} from "../rest/rest.service";
import {SettingsService} from "../settings/settings.service";

@Injectable()
export class TournamentService {



  constructor(private settingsService : SettingsService , private  restService : RestService) { }

  //public getBaseUrl() : string { return this.settingsService.backendUrl; }
  public getBaseUrl() : string { return "http://localhost:8888/api/"; }
  private getTournamentUrl()  :  string { return this.getBaseUrl() + "tournament/get"; }
  private getAllTournamentsUrl()  : string { return this.getBaseUrl() + "tournament/all"; }
  private newTournamentUrl()  : string { return this.getBaseUrl() +"tournament/new"; }
  private updateTournamentUrl()  : string { return this.getBaseUrl() +"tournament/update"; }

  public getTournament(id : string): Observable<any> {
    if(id){
      return this.restService.doGet(this.getTournamentUrl()+"/"+id);
    } else {
      return new Observable((observer: Observer<Tournament>)  => observer.next(new Tournament()));
    }
  }

  public getAllTournaments(): Observable<any> {
    return this.restService.doGet(this.getAllTournamentsUrl());
  }

  public saveTournament(tour: Tournament): Observable<any> {
    console.log(tour);
    
    if(tour.id){
      return this.restService.doPost(this.updateTournamentUrl(), tour);
    } else {
      return this.restService.doPut(this.newTournamentUrl(), tour);
    }

  }

}
