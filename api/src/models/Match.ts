import { HOME_TEAM_WINS, MATCH_IS_DRAW, OUT_TEAM_WINS} from "./Constants";

export class Match{
    homeTeamName : string;
    outTeamName: string;
    homeTeamScore: number = undefined;
    outTeamScore: number = undefined;

    constructor(homeTeamName: string, outTeamName : string){
        this.homeTeamName = homeTeamName;
        this.outTeamName = outTeamName;
    }

    getOutCome() : number {
        if(this.homeTeamScore > this.outTeamScore){
            return HOME_TEAM_WINS;
        } else if(this.outTeamScore > this.homeTeamScore){
            return OUT_TEAM_WINS;
        }
        return MATCH_IS_DRAW;
    }

    static deserialize(input: any) : Match {
        const m = new Match(input.homeTeamName, input.outTeamName);
        Object.assign(m, input);
        return m;

    }


}

export class KnockoutMatch extends Match {
    homeTeamPenaltyScore : number = undefined;
    outTeamPenaltyScore: number = undefined;

    getOutCome() : number {
        let outCome =  super.getOutCome();
        if(outCome == MATCH_IS_DRAW){
            //This means match was with penals ...
            if(this.homeTeamPenaltyScore > this.outTeamPenaltyScore){
                return HOME_TEAM_WINS
            } else {
                return OUT_TEAM_WINS
            }
        }
        return outCome
    }
}