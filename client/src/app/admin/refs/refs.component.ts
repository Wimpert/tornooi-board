import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {TournamentService} from "../../services/tournament/tournament.service";
import {isUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {map, shareReplay, switchMap} from "rxjs/operators";
import {Tournament} from "../../../../../api/src/models/Tournament";

declare var TournamentUtils : any;

@Component({
  selector: 'app-refs',
  templateUrl: './refs.component.html',
  styleUrls: ['./refs.component.scss']
})
export class RefsComponent implements OnInit {

  perMatch : number = 6;

  refs:any;

  constructor( private router: Router,private route: ActivatedRoute, private tournamentService : TournamentService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => this.tournamentService.getTournament(params['tid'])),
      map((tournament: Tournament) => {
        const returnVal = {}
        tournament.data.groups.forEach((group) =>{
          group.matches.forEach((match) =>{
            if(returnVal[match.ref] === undefined){
              returnVal[match.ref] = this.perMatch;
            } else {
              returnVal[match.ref] = returnVal[match.ref] + this.perMatch;
            }
          });
        });

        tournament.data.rounds.forEach((round) => {
          round.matches.forEach((match)=> {
            if(returnVal[match.ref] === undefined){
              returnVal[match.ref] = this.perMatch;
            } else {
              returnVal[match.ref] = returnVal[match.ref] + this.perMatch;
            }
          });

          ;
        });
        tournament.data.womensCup.group.matches.forEach((match) => {
          console.log(match.matchNumber);
          if(returnVal[match.ref] === undefined){
            returnVal[match.ref] = this.perMatch;
          } else {
            returnVal[match.ref] = returnVal[match.ref] + this.perMatch;
          }
        });
        tournament.data.womensCup.finals.matches.forEach((match) => {
          console.log(match.matchNumber);
          if(returnVal[match.ref] === undefined){
            returnVal[match.ref] = this.perMatch;
          } else {
            returnVal[match.ref] = returnVal[match.ref] + this.perMatch;
          }
        })
        return returnVal;
      }),
      shareReplay()
    ).subscribe( val => this.refs = val);

  }

  getKeys(obj : any){
    return Object.keys(obj);
  }

}
