import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {TournamentService} from "../services/tournament.service";
import {Observable} from "rxjs/Observable";
import {Tournament} from "../../../../api/src/models/Tournament";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {switchMap} from "rxjs/operators";

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

  constructor(public userService: UserService, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.allTournaments$ = this.tournamentService.getAllTournaments();

    this.tournamentToDisplay$ = this.selectChanged$.pipe(
      switchMap(id => this.tournamentService.getTournament(id))
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

}
