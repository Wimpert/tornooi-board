import { Component, OnInit } from '@angular/core';
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TournamentService} from "../../services/tournament/tournament.service";
import {Observable} from "rxjs/Observable";
import {Tournament} from "../../../../../api/src/models/Tournament";
import {Match} from "../../../../../api/src/models/Match";
import {getMatchesPerGroundOrderByStartTime} from "../../../../../api/src/utils/TournamentUtils";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  matches$ : Observable<{terrain:number, matches:Match[]}>
  constructor(private route: ActivatedRoute, private tournamentService : TournamentService) { }

  ngOnInit() {
    this.matches$ = this.route.params.pipe(
      switchMap((params: Params) => this.tournamentService.getTournament(params['id'])),
      map(tournament => getMatchesPerGroundOrderByStartTime(tournament.data))
    );
  }
}
