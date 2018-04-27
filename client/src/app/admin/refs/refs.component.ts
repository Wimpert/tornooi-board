import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {TournamentService} from "../../services/tournament/tournament.service";
import {isUndefined} from "util";

declare var TournamentUtils : any;

@Component({
  selector: 'app-refs',
  templateUrl: './refs.component.html',
  styleUrls: ['./refs.component.scss']
})
export class RefsComponent implements OnInit {

  perMatch : number = 6;

  tournament : any = undefined;
  refHash : any = {};
  refKeys : string[] = [];

  constructor( private router: Router,private route: ActivatedRoute, private tournamentService : TournamentService) { }

  ngOnInit() {

    this.route.params
    // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
            this.tournamentService.getTournament(params['tid'])
        ).subscribe((tour: any) => {
          this.tournament = tour;
          var matches = TournamentUtils.getMatchesOrderedByMatchNr(this.tournament);
          matches.forEach((match)=> {

            console.log(match.matchNumber + " - " + match.ref);
            if(isUndefined(this.refHash[match.ref])){
              this.refHash[match.ref] = 0;
              this.refKeys.push(match.ref);
            }
            this.refHash[match.ref] = this.refHash[match.ref]+1;
          });
        }
    );
  }

}
