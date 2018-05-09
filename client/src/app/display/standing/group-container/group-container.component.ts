import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../../../../../api/src/models/Group";

@Component({
  selector: 'app-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.scss']
})
export class GroupContainerComponent implements OnInit {

  @Input() group : Group;

  constructor() { }

  ngOnInit() {
  }

}
