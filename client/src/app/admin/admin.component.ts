import { KnockOutRound } from './../../../../api/src/models/KnockOutRound';
import { TournamentData } from './../../../../api/src/models/TournamentData';
import { Component, OnInit, group } from '@angular/core';
import {TournamentService} from "../services/tournament/tournament.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { proccesMatches, compareTeams, addToNextRound, processRound } from '../../../../api/src/utils/TournamentUtils';
import {Tournament} from "../../../../api/src/models/Tournament";

declare var TournamentUtils : any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  interVal: any;
  tournament : Tournament = undefined;


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

        this.tournament = tour;
        this.updateStandings();
      }
    );


  }

  save():void{
    console.log("saving");

    this.tournamentService.newTournament(this.tournament.data).subscribe(
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
    this.tournament.data.groups.forEach((group) => {
    proccesMatches(group);
    group.teams.sort(compareTeams);
    });
  }

  handleRequest(round: KnockOutRound) : void {
    const index = this.tournament.data.rounds.indexOf(round);
    processRound(this.tournament.data, index);

  }

}
