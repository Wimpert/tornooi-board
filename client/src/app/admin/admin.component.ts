import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {TournamentService} from "../services/tournament.service";
import {Observable} from "rxjs/Observable";
import {Tournament} from "../../../../api/src/models/Tournament";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {merge, switchMap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  username: string;
  password: string;

  allTournaments$: Observable<Tournament[]>;
  tournamentToDisplay$: Observable<Tournament>;
  private selectChanged$ = new ReplaySubject<number>();
  private  reqestNewTournament$ = new Subject<Tournament>();
  private  saveTournament$ = new Subject<Tournament>();

  constructor(public userService: UserService, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.allTournaments$ = this.tournamentService.getAllTournaments();

    this.tournamentToDisplay$ = this.selectChanged$.pipe(
      switchMap(id => this.tournamentService.getTournament(id)),
      merge(this.reqestNewTournament$.pipe(
        switchMap(_ => this.tournamentService.createNewTournament())
      )),
      merge(this.saveTournament$.pipe(
        switchMap(tournament => this.tournamentService.saveTournament(tournament))
      ))
    );

  }

  login(): void{
    this.userService.login(this.username, this.password, true);
  }

  logout(): void{
    this.userService.logout();
  }

  tournamentChosen(event) : void{
    this.selectChanged$.next(event.target.value);

  }

  save(tournament: Tournament): void {
    tournament.data.groups.forEach((group) => {
      group.orderTeams();
      console.log(group);
    });
    this.saveTournament$.next(tournament);
  }

  createNew(): void{
    this.reqestNewTournament$.next();
  }

}
