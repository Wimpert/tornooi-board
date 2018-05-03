import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../../services/tournament/tournament.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isUndefined} from "util";
import {PrintService} from "../../services/print/print.service";
import {DatePipe} from "@angular/common";
import {min} from "rxjs/operator/min";
import {switchMap} from "rxjs/operators";
import {getMatchesOrderedByMatchNr} from "../../../../../api/src/utils/TournamentUtils";

declare var jsPDF : any;

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  matches : any[] = [];
  from: number;
  to: number;
  tourId : string;

  constructor(private router : Router ,private route: ActivatedRoute, private tournamentService : TournamentService, private printService : PrintService) { }

  ngOnInit() {
    console.log("init");
    this.route.params.pipe(
      switchMap((params: Params) =>
      this.tournamentService.getTournament(params['tid'])
    )).subscribe((tour: any) => {
      console.log(tour);
      this.matches = getMatchesOrderedByMatchNr(tour.data);
          this.tourId = tour.id;
          this.matches.forEach(function (match) {
              match.selectedForPrint = false;
          })
        }
    );
  }

  getMatchesToPrint() : any[] {
    let forPrinting = [];
    if((!isUndefined(this.from) && !isUndefined(this.to)) && this.from <= this.to){
      console.log("here");
      var id = this.from-1;
          while (id <= this.to-1){
              forPrinting.push(this.matches[id]);
              id++;
          }
    } else {
      this.matches.forEach(function (match) {
         if(match.selectedForPrint){
           forPrinting.push(match);
         }
      })
    }

    //reset:
    this.from = undefined;
    this.to = undefined;
    this.matches.forEach(function (match) {
      match.selectedForPrint = false;
    });

      return forPrinting;

    //printIds.forEach()
    /*this.printService.setMatchesForPrintng(forPrinting);
    this.router.navigate(['/sheet']);*/

  }

    width =  98;
    heigth =  90;
    margin = 5;
    normalFontSize = 10;
    smallFontSize = 7;

  download() : void {

      let forPrinting = this.getMatchesToPrint();
      var doc = new jsPDF();
      doc.setLineWidth(0.1);
      doc.setFontSize(this.normalFontSize);

      var row = 1;
      var col = 1;
      var indexOnPage = 0 ;
      forPrinting.forEach((match) => {
          if(indexOnPage==6){
              //add page
              indexOnPage = 0;
              row = 1 ;
              col = 1;
              doc.addPage();
          }
          if(indexOnPage != 0 && indexOnPage%2==1){
              col++;
          } else  if(indexOnPage != 0 && indexOnPage%2==0){
              row++;
              col=1;
          }

          var x = col*this.margin + (col-1)*this.width;
          var y = row*this.margin + (row-1)*this.heigth;
          console.log(indexOnPage + ": " + row + " + " + col + " - " + x + " - " + y);
          this.drawGameSheet(doc, x, y, match);
          indexOnPage++;
      });


      doc.save('blad.pdf')
  }

  drawGameSheet(doc,x,y, match):void {

        doc.rect(x, y, this.width, this.heigth);

        var textHeigth = y+6;
        var textMargin = 2;
        doc.setFontSize(this.normalFontSize);
        doc.line((x+15), y,(x+15),(y+10));
        doc.text(""+match.matchNumber,(x+textMargin), textHeigth);

        doc.line((x+30), y,(x+30),(y+10));
        doc.text(this.getFormattedTime(match),(x+textMargin+15), textHeigth);

        doc.line((x+85), y,(x+85),(y+10));
        doc.text(match.ref,(x+textMargin+35), textHeigth);
        doc.text("T"+match.terrain,(x+textMargin+85), textHeigth);
        doc.line(x,(y+10), (x+this.width), (y+10));

        //Next row:
        textHeigth =  y + 18;
        doc.setFontSize(this.normalFontSize);
        doc.line((x+40), (y+10),(x+40), (y+25));
        doc.text(match.homeTeamName?match.homeTeamName:"", (x+textMargin), textHeigth);
        doc.line((x+58), (y+10),(x+58), (y+25));
        doc.setFontSize(this.smallFontSize);
        doc.text("eindstand:", (x+textMargin+40), textHeigth-5);
        doc.setFontSize(this.normalFontSize);
        doc.text(match.outTeamName?match.outTeamName:"", (x+textMargin+58), textHeigth);
        doc.line(x,(y+25), (x+this.width), (y+25));

        //Next row:
        textHeigth = y + 30;
        doc.setFontSize(this.smallFontSize);
        doc.text("Goals Thuisploeg:", (x+textMargin), textHeigth);
        doc.line((x+25),(y+25),(x+25),(y+40));
        doc.text("Corners Thuisploeg:", (x+textMargin+25), textHeigth);
        doc.line((x+49),(y+25),(x+49),(y+40));
        doc.text("Goals Uitploeg:", (x+textMargin+49), textHeigth);
        doc.line((x+73),(y+25),(x+73),(y+40));
        doc.text("Corners Uitploeg:", (x+textMargin+73), textHeigth);
        doc.line(x,(y+40), (x+this.width), (y+40));

        //Next row:
        textHeigth = y + 45;
        doc.text("Opmerkingen / Kaarten", (x+textMargin),textHeigth );
        doc.line(x,(y+70), (x+this.width), (y+70));

        //Next row:
        textHeigth = y + 75;
        doc.text("Handtekening thuisploeg:", (x+textMargin),textHeigth );
        doc.line((x+49),(y+70),(x+49),(y+90));
        doc.text("Handtekening uitploeg:", (x+textMargin+49),textHeigth );
        doc.setFontSize(this.normalFontSize);
        /*
        doc.rect(x,y, this.width/2 , 90 );
        doc.rect(x+this.width/2,y, this.width/2 , 90 );*/

    }


    getFormattedTime(match) : string {
        var hours  = new Date(match.startTime+"").getHours();
        var hoursString = ""+hours;
        if(hours<10){
            hoursString = "0"+hoursString;
        }
        var minutes =  new Date(match.startTime+"").getMinutes()
        var minutesString = ""+minutes;

        if(minutes<10){
            minutesString = "0"+minutesString;
        }

        return  hoursString+ ":" + minutesString;
    }

}


