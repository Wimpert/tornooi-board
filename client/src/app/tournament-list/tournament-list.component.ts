import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../services/tournament/tournament.service";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  existingTournaments : any[] = [];

  constructor(private tournamentService :  TournamentService){}

  ngOnInit() {
    this.tournamentService.getAllTournaments().subscribe(
      data => {
        this.existingTournaments = data;
      }
    );
  }

  createNew(){
    this.tournamentService.newTournament().subscribe(
      (_) =>  console.log("created", _)
    );
  }

}
