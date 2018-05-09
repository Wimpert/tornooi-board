import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sponsor-container',
  templateUrl: './sponsor-container.component.html',
  styleUrls: ['./sponsor-container.component.scss']
})
export class SponsorContainerComponent implements OnInit {

  @Input() imageName:string;

  constructor() { }

  ngOnInit() {
  }

}
