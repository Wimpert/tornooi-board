import { KnockOutRound } from './../../../../api/src/models/KnockOutRound';
import { TournamentData } from './../../../../api/src/models/TournamentData';
import { Component, OnInit, group } from '@angular/core';
import {TournamentService} from "../services/tournament/tournament.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isUndefined} from "util";
import { switchMap } from 'rxjs/operators';
import { proccesMatches, compareTeams, addToNextRound, processRound } from '../../../../api/src/utils/TournamentUtils';

declare var TournamentUtils : any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  interVal: any;
  tournament : TournamentData = undefined;


  constructor( private router: Router,private route: ActivatedRoute, private tournamentService : TournamentService) { }

  ngOnDestroy() {
    //window.clearTimeout(this.interVal);
  }


  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) =>
        this.tournamentService.getTournament(params['id'])
      ))
      .subscribe((tour: any) => {
        console.log(tour);
        this.tournament = tour.data;
        this.updateStandings();
      }
    );


  }

  save():void{
    console.log("saving");

    this.tournamentService.newTournament(this.tournament).subscribe(
      (data)=>{
        if(data.id){
          this.router.navigate(['/admin', data.id]);
        } else {
          this.tournament = data;
        }
      }
    );
  }

  onChanged(match){
    this.updateStandings();
  }

  process(groupIndex){
   addToNextRound(this.tournament,groupIndex);

  }

  private updateStandings(): void {
    this.tournament.groups.forEach((group) => {
    proccesMatches(group);
    group.teams.sort(compareTeams);
    });
  }

  handleRequest(round: KnockOutRound) : void {
    const index = this.tournament.rounds.indexOf(round);
    processRound(this.tournament, index);

  }

}
