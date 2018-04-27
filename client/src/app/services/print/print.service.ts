import { Injectable } from '@angular/core';

@Injectable()
export class PrintService {

  private matches : any[];

  constructor() { }

  getMatchesForPrintng() : any[] {
    return this.matches;
  }
  setMatchesForPrintng(matches:any[]) : void {
    this.matches=matches;
  }

}
