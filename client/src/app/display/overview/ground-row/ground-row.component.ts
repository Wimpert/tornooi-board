import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../../../../api/src/models/Match";

@Component({
  selector: 'app-ground-row',
  templateUrl: './ground-row.component.html',
  styleUrls: ['./ground-row.component.scss']
})
export class GroundRowComponent implements OnInit {

  @Input() matches: Match[];
  @Input() ground: string;

  colors: string[] = [
    "red",
    "blue",
    "green",
    "yellow",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white"
  ];

  constructor() { }

  ngOnInit() {
    //console.log(this.matches);
  }

}
