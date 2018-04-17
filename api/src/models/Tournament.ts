import {Group} from "./Group";
import {KnockOutRound} from "./KnockOutRound";
import {getTournamentData} from "../utils/TournamentUtils";

export class Tournament{

    id: number;
    data: TournamentData;
    creationdate: Date;
    lastupdate: Date;
    isRef : string;


    constructor(){
        let now = new Date();
        this.data = getTournamentData();
        this.creationdate = now;
        this.lastupdate = now;
        this.isRef = 'N';
    }

}

export class TournamentData{
    groups : Group[];
    knockOutRounds :  KnockOutRound[];

    constructor() {
        this.groups = [];
        this.knockOutRounds = [];
    }
}