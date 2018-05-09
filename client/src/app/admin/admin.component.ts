import { KnockOutRound } from './../../../../api/src/models/KnockOutRound';
import { Component, OnInit, group } from '@angular/core';
import {TournamentService} from "../services/tournament/tournament.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { proccesMatches, compareTeams, addToNextRound, processRound } from '../../../../api/src/utils/TournamentUtils';
import {Tournament} from "../../../../api/src/models/Tournament";
import {TournamentData} from "../../../../api/src/models/TournamentData";

declare var TournamentUtils : any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  tournament : Tournament = undefined;


  constructor( private router: Router,private route: ActivatedRoute, private tournamentService : TournamentService) { }


  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) =>
        this.tournamentService.getTournament(params['id'])
      ))
      .subscribe((tour: any) => {
        console.log("from service", tour);
        this.tournament = tour;
        this.updateStandings();
      }
    );


  }

  save():void{
    if(this.tournament.id){
      this.tournamentService.saveTournament(this.tournament).subscribe(
        (tour) => {
          console.log("came bock");

          this.tournament = tour;
          this.tournament.data  = TournamentData.deserialize(tour.data);
        }
      );
    } else {
      this.tournamentService.newTournament().subscribe(
        (data)=>{
          if(data.id){
            this.router.navigate(['/admin', data.id]);
          } else {
            this.tournament = data;
          }
        }
      );
    }
  }

  onChanged(event){
    console.log(event);
    if(event.matchNumber > 112){
      this.updateWomensGroup();
    }
    this.updateStandings();

  }

  afterWomensDraw(){
    this.updateWomensGroup();
  }
  updateWomensGroup(){
    proccesMatches(this.tournament.data.womensCup.group);
    this.tournament.data.womensCup.group.teams.sort(compareTeams);
  }


  process(groupIndex){
   addToNextRound(this.tournament.data,groupIndex);

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
