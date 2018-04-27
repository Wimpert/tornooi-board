import {Team} from "./team";
import {GroupMatch} from "./group-match";


export class Group {

    teams : Team[];
    matches : GroupMatch[];
    name : string;
    isLoting: boolean;

    constructor(name: any, teamNames: any[]){
        this.name=name;
        this.teams = [];
        this.isLoting=false;
        teamNames.forEach((teamName) => {
            var team = new Team(teamName);
            this.teams.push(team);
        });

        this.matches = [];


        this.matches.push(new GroupMatch(this.teams[0],this.teams[1]));
        this.matches.push(new GroupMatch(this.teams[2],this.teams[3]));

        this.matches.push(new GroupMatch(this.teams[0],this.teams[2]));
        this.matches.push(new GroupMatch(this.teams[1],this.teams[3]));

        this.matches.push(new GroupMatch(this.teams[3],this.teams[0]));
        this.matches.push(new GroupMatch(this.teams[2],this.teams[1]));

    }

}
