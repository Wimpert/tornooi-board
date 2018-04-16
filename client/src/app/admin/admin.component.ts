import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {TournamentService} from "../services/tournament.service";
import {Observable} from "rxjs/Observable";
import {Tournament} from "../../../../api/src/models/Tournament";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  username: string;
  password: string;

  allTournaments$: Observable<Tournament[]>

  constructor(public userService: UserService, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.allTournaments$ = this.tournamentService.getAllTournaments();
  }

  login(): void{
    this.userService.login(this.username, this.password, true);
  }

  logout(): void{
    this.userService.logout();
  }

}
