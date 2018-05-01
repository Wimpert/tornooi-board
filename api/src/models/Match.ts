import { HOME_TEAM_WINS, MATCH_IS_DRAW, OUT_TEAM_WINS} from "./Constants";

export class Match{
    homeTeamName : string;
    outTeamName: string;
    homeTeamScore: number = undefined;
    outTeamScore: number = undefined;
    terrain: string;
    startTime: Date;
    matchNumber: number;
    ref: string;

    constructor(homeTeamName?: string, outTeamName?: string, terrain?: string, startTime?: Date){
        this.homeTeamName = homeTeamName;
        this.outTeamName = outTeamName;
        if(terrain){
            this.terrain = terrain;
        } else {
            this.terrain = "Terrein";
        }
        if(startTime){
            this.startTime = startTime
        } else {
            this.startTime = new Date();
        }
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
    from: number;
    to: number;

    

    getOutCome() : number {
        
        let outCome =  super.getOutCome();
        
       // console.log(outCome == MATCH_IS_DRAW);
        
        if(outCome == MATCH_IS_DRAW){
            //This means match was with penals ...
            if(this.homeTeamPenaltyScore != undefined && this.outTeamPenaltyScore != undefined) {
                if(this.homeTeamPenaltyScore > this.outTeamPenaltyScore){
                    return HOME_TEAM_WINS
              } else {
                return OUT_TEAM_WINS
                }
            }else{
                return outCome;
            }
        }
        
        return outCome
    }

    getWinner() :  string {
        if(this.getOutCome() === HOME_TEAM_WINS){
             return this.homeTeamName;
        } 
        return this.outTeamName;
    }

    getLoser() :  string {
        if(this.getOutCome() === OUT_TEAM_WINS){
            return this.homeTeamName;
        } 
        return this.outTeamName;
    }
}