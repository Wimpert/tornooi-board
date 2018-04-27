import { TournamentData } from './../../../../../api/src/models/TournamentData';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TournamentService} from "../../services/tournament/tournament.service";

declare var TournamentUtils : any;

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.scss']
})
export class GroupsDisplayComponent implements OnInit {

  tournament: TournamentData ;
  refreshRate: number = 10000;
  infoTimer: number = 3*1000;
  sponsorTimer: number = 3*1000;
  showSponsor: boolean = false;

  index : number;

  refreshTimeOut;
  displayTimeOut;

  constructor(private route: ActivatedRoute, private tournamentService : TournamentService) {
    this.index=0;
  }


  isWinner(match, team):boolean{
    return TournamentUtils.isWinner(match,team);
  }

  ngOnDestroy() {
    console.log("destroying timeouts");
    window.clearTimeout(this.refreshTimeOut);
    window.clearTimeout(this.displayTimeOut);

  }


  ngOnInit() {
    this.route.params.subscribe(
        data => this.index = +data.gid
    );

    this.refreshData();
    this.switchDisplay();
  }

  refreshData() : void{
    console.log("refreshing data");
    this.route.params
    // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
            this.tournamentService.getTournament(params['tid'])
        ).subscribe((tour: any) => {
          this.tournament = tour;
          //console.log(this.tournament);
          this.refreshRate = this.tournament.refreshInterVal?this.tournament.refreshInterVal:this.refreshRate;
          this.refreshTimeOut = window.setTimeout(()=>{this.refreshData();} ,this.refreshRate);
          this.infoTimer = this.tournament.showInfoTime?this.tournament.showInfoTime:this.infoTimer;
          //console.log("info: " + this.infoTimer);
          this.sponsorTimer = this.tournament.showSponserTime?this.tournament.showSponserTime:this.sponsorTimer;
          //console.log("sponser: " + this.sponsorTimer);
        }
    );
  }

  switchDisplay():void{
    //console.log("switching: " + this.sponsorTimer + " - " + this.infoTimer);
    if(this.showSponsor){
      this.showSponsor=false;
      //console.log("showing info");
      this.displayTimeOut = window.setTimeout( ()=>{this.switchDisplay();} ,this.infoTimer);
    } else if(!this.showSponsor){
      this.showSponsor=true;
      //console.log("showing sponser");
      this.displayTimeOut = window.setTimeout( ()=>{this.switchDisplay();},this.sponsorTimer);
    }
  }





}
