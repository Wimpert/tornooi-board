import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs/observable/interval";
import {map, shareReplay, startWith, switchMap, tap} from "rxjs/operators";
import {getMatchesPerGroundOrderByStartTime} from "../../../../../api/src/utils/TournamentUtils";
import {Observable} from "rxjs/Observable";
import {Group} from "../../../../../api/src/models/Group";
import {TournamentService} from "../../services/tournament/tournament.service";
import {ActivatedRoute} from "@angular/router";
import {Tournament} from "../../../../../api/src/models/Tournament";

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss']
})
export class StandingComponent implements OnInit {

  groups$: Observable<Group[]>;
  showSponsors$: Observable<boolean>;

  sponsors = [ "Wynant.jpg",
  "devos_opt.jpg",
  "praktijkdevos.jpe",
  "didierbouck.pdf",
  "pype-meerch.jpg",
  "avalue.jpg",
  "garage_devos.pdf",
  "remmerie.jpg",
  "bolle.jpg",
  "granimar.jpg",
  "stamand_opt.jpg",
  "coarle.jpg",
  "tchar.jpg",
  "creo.png",
  "herenkapper.jpg",
  "tlektro.jpg",
  "jorn.jpg",
  "vakantiewoning_opt.jpg",
  "debrabandere.jpg",
  "ka.png",
  "delsport.jpg"
  ];

  sponsorsToShow : string[];
  sponsorsIndex = 0;

  constructor(private route: ActivatedRoute, private tournamentService : TournamentService) { }

  ngOnInit() {
    this.groups$ = interval(20000).pipe(
      startWith(1),
      switchMap(_ => this.route.params.pipe(
        tap(_=>console.log("from params",_)),
        switchMap((params) => this.tournamentService.getTournament(params['tid'])),
        tap(data=> console.log("from service:", data)),
        map((tournament : Tournament) => {
          const returnVal : Group[] = [];
          tournament.data.groups.forEach((group)=>returnVal.push(group));
          //returnVal.push(tournament.data.womensCup.group);
          return returnVal
        }),

      )),
      shareReplay()
    );
    this.showSponsors$ = interval(1000).pipe(
      tap(_ => this.sponsorsToShow = [
        this.sponsors[this.sponsorsIndex],
        this.sponsors[this.sponsorsIndex+1],
        this.sponsors[this.sponsorsIndex+2],
        this.sponsors[this.sponsorsIndex+3]]),
      tap(_ => {
        this.sponsorsIndex = this.sponsorsIndex + 4;
        if (this.sponsorsIndex > this.sponsors.length){
          this.sponsorsIndex =0;
        }
      }),
      map(_ => _%2 == 0)
    )
  }

}
