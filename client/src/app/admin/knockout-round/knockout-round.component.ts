import { KnockOutRound } from './../../../../../api/src/models/KnockOutRound';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { processRound } from '../../../../../api/src/utils/TournamentUtils';

declare var TournamentUtils : any;

@Component({
  selector: 'knockout-round',
  templateUrl: './knockout-round.component.html',
  styleUrls: ['./knockout-round.component.scss']
})
export class KnockoutRoundComponent implements OnInit {

  @Input() round:KnockOutRound;
  @Output() processRequest: EventEmitter<KnockOutRound> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  process():void {
    this.processRequest.next(this.round);
  }

}
