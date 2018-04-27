import {Component, OnInit, Input} from '@angular/core';
import {Group} from "../../../entities/group";
import {Team} from "../../../entities/team";

@Component({
  selector: 'group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss']
})
export class GroupBoxComponent implements OnInit {

  @Input() group : Group;

  constructor() { }

  ngOnInit() {}

  isWinner(team : Team):boolean{
    return true;
  }

}
