import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../../../../../api/src/models/Match";

@Component({
  selector: 'app-match-box',
  templateUrl: './match-box.component.html',
  styleUrls: ['./match-box.component.scss']
})
export class MatchBoxComponent implements OnInit {

  @Input() match: Match;

  constructor() { }

  ngOnInit() {
    //console.log(this.match);
  }

}
