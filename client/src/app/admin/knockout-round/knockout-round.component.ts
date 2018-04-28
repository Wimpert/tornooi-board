import { KnockOutRound } from './../../../../../api/src/models/KnockOutRound';
import {Component, OnInit, Input} from '@angular/core';
import { processRound } from '../../../../../api/src/utils/TournamentUtils';

declare var TournamentUtils : any;

@Component({
  selector: 'knockout-round',
  templateUrl: './knockout-round.component.html',
  styleUrls: ['./knockout-round.component.scss']
})
export class KnockoutRoundComponent implements OnInit {

  @Input() round:KnockOutRound;

  constructor() { }

  ngOnInit() {}

  process():void {
    console.log(this.round);
    processRound(this.round);
  }

}
