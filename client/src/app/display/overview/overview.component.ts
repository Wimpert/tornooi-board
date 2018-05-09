import { Component, OnInit } from '@angular/core';
import {combineLatest, map, shareReplay, startWith, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TournamentService} from "../../services/tournament/tournament.service";
import {Observable} from "rxjs/Observable";
import {Tournament} from "../../../../../api/src/models/Tournament";
import {Match} from "../../../../../api/src/models/Match";
import {getMatchesPerGroundOrderByStartTime} from "../../../../../api/src/utils/TournamentUtils";
import {interval} from "rxjs/observable/interval";
import {of} from "rxjs/observable/of";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  matches$ : Observable<{terrain:number, matches:Match[]}>;
  keys: string[];

  constructor(private route: ActivatedRoute, private tournamentService : TournamentService) { }

  ngOnInit() {
    this.matches$ = interval(20000).pipe(
      startWith(1),
      switchMap(_ => this.route.params.pipe(
        tap(_=>console.log("from params",_)),
        switchMap((params) => this.tournamentService.getTournament(params['tid'])),
        tap(data=> console.log("from service:", data)),
        map(tournament => getMatchesPerGroundOrderByStartTime(tournament.data)),
        tap( _ => this.keys = Object.keys(_)),

      )),
      shareReplay()
    );



  }
}
