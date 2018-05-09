import {Component, OnInit, Input} from '@angular/core';
import {isUndefined} from "util";
import {Team} from "../../../../../api/src/models/Team";
import {KnockoutMatch} from "../../../../../api/src/models/Match";

@Component({
  selector: 'knockout-match',
  templateUrl: './knockout-match.component.html',
  styleUrls: ['./knockout-match.component.scss']
})
export class KnockoutMatchComponent implements OnInit {

  @Input() match : KnockoutMatch;

  constructor() { }

  ngOnInit() {
    /*if(isUndefined(this.match.outTeam)){
      this.match.outTeam = new Team("");
    }
    if(isUndefined(this.match.homeTeam)){
      this.match.homeTeam = new Team("");
    }*/
  }

  showPenals(): boolean {
     return ((this.match.homeTeamScore != undefined && this.match.outTeamScore != undefined)
              && (this.match.homeTeamScore == this.match.outTeamScore))
  }



}
