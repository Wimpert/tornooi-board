import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PrintService} from "../../services/print/print.service";
import {isUndefined} from "util";



@Component({
  selector: 'game-sheet',
  templateUrl: './game-sheet.component.html',
  styleUrls: ['./game-sheet.component.scss']
})
export class GameSheetComponent implements OnInit, AfterViewInit {

  matches : number[] = [1,2];
  maxPerPage : number = 3;
  pages : any[][];

  constructor(private printService: PrintService) {}

  ngOnInit() {
    this.matches = this.printService.getMatchesForPrintng();
    if(!isUndefined(this.matches) && this.matches.length > 0){
      this.initPages();
    }
  }

  ngAfterViewInit(): void {
    console.log("view init");
    //window.print();
    console.log("test");
  }

  initPages():void{
    this.pages = [];
    this.matches.forEach((match,index) => {
      if(index%this.maxPerPage == 0){
        this.pages.push([]);
      }
      //get the last:
      var toPut = this.pages.pop()
      //add it:
      toPut.push(match);
      //put it back:
      this.pages.push(toPut);
    })
  }

}
