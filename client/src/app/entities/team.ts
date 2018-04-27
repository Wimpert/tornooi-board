import {GroupMatch} from "./group-match";

export class Team {

  name : string;
  points : number;
  goalsScored : number;
  goalsConcieved : number;
  matchesPlayed : number;
  matchesWon : number;
  matchesLost : number;
  matchesDrawed : number;
  matches : GroupMatch[];


  constructor( name : string ){
    this.name=name;
    this.points = 0;
    this.goalsScored=0;
    this.goalsConcieved=0;
    this.matchesPlayed=0;
    this.matchesWon=0;
    this.matchesLost=0;
    this.matchesDrawed=0;
  }

}
