/**
 * Created by whv2li8 on 18/04/2017.
 */
import {Team} from "./team";
import {isUndefined} from "util";

export class KnockOutMatch {

    homeTeam : Team;
    outTeam : Team;
    homeTeamScore : number;
    outTeamScore : number;
    homeTeamPenaltyScore : number;
    outTeamPenaltyScore : number;
    from: number;
    to: number;
    matchNumber:number;
    ground : string;
    ref: string;
    time : Date;


    constructor(from: number, to : number){
        this.from = from;
        this.to = to;
    }

    getWinner() : Team{
        if(this.homeTeamScore != undefined && this.outTeamScore != undefined){
            if(this.homeTeamScore > this.outTeamScore){
                return this.homeTeam;
            } else if(this.outTeamScore > this.homeTeamScore){
                return this.outTeam
            } else if(this.homeTeamPenaltyScore > this.outTeamPenaltyScore){
                return this.homeTeam;
            } else if(this.homeTeamPenaltyScore < this.outTeamPenaltyScore){
                return this.outTeam;
            }
        }
    }


}
