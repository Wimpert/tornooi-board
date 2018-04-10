import {Group} from "./Group";

export class Team {

    public name: string;
    points: number = 0 ;
    matchesWon: number = 0 ;
    matchesLost: number = 0;
    matchesDrawed: number = 0;
    goalsScored: number = 0;
    goalsConcieved: number = 0;


    constructor(name:string){
        this.name =  name;
    }



    reset() :void {

        this.points = 0;

        this.matchesDrawed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;

        this.goalsScored = 0;
        this.goalsConcieved = 0;
    }

    getGoalsDifference() : number {
        return this.goalsScored - this.goalsConcieved;
    }

    static deserialize(input: any) : Team {
        const name = input.name;
        const team = new Team(name);
        /*Object.assign(Team, input);
        console.log(team);*/
        team.points =  Number(input.points);
        team.matchesWon = Number(input.matchesWon);
        team.matchesLost = Number(input.matchesLost);
        team.matchesDrawed = Number(input.matchesDrawed);
        team.goalsScored = Number(input.goalsScored);
        team.goalsConcieved = Number(input.goalsConcieved);
        return team;

    }


}