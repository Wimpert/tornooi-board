import { Match } from './../../../../../api/src/models/Match';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'poule-match',
  templateUrl: './poule-match.component.html',
  styleUrls: ['./poule-match.component.scss']
})
export class PouleMatchComponent implements OnInit {

  @Input() match: Match;
  @Output() onChanged = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {}

  changed () :void {
    this.onChanged.emit(this.match);
  }

}
