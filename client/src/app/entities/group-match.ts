import {Team} from "./team";

export class GroupMatch {

  homeTeam : Team;
  outTeam : Team;
  homeTeamScore : number;
  outTeamScore : number;
  matchNumber:number;
  ground : string;
  ref: string;
  time : Date;



  constructor(homeT : Team, outT : Team){
    this.homeTeam = homeT;
    this.outTeam = outT;
    this.homeTeamScore = undefined ;
    this.outTeamScore = undefined ;

  }


}
