import {Team} from "./Team";
import {Match} from "./Match";
import {HOME_TEAM_WINS, OUT_TEAM_WINS} from "./Constants";

export  class Group {

    groupname : string;
    teams : Team[];
    matches : Match[];
    allMatchesPlayed : boolean = false;
     groupNeedsDraw : boolean = false;
     equalTeams : Team[][];

    constructor(groupname?:string, teams?: Team[]){
        this.groupname =groupname;
        this.teams = teams;
        if(this.teams){
            this.initMatches();
        }
    }

    private initMatches() :  void{

        this.matches = [];
        this.matches.push(new Match(this.teams[0].name, this.teams[1].name));
        this.matches.push(new Match(this.teams[2].name, this.teams[3].name));

        this.matches.push(new Match(this.teams[0].name, this.teams[2].name));
        this.matches.push(new Match(this.teams[3].name, this.teams[1].name));

        this.matches.push(new Match(this.teams[3].name, this.teams[0].name));
        this.matches.push(new Match(this.teams[1].name, this.teams[2].name));
    }

    processMatches() : void{

        this.allMatchesPlayed = true;

        this.teams.forEach((team) => {
           team.reset();
        });

        this.matches.forEach((match) => {
            if(match.outTeamScore != undefined && match.homeTeamScore != undefined){
                //this means match is played, so let do what we need to do:
                let matchOutCome = match.getOutCome();
                let homeTeam = this.getTeam(match.homeTeamName);
                let outTeam = this.getTeam(match.outTeamName);
                if(matchOutCome == HOME_TEAM_WINS){
                    homeTeam.points += 3;
                    homeTeam.matchesWon++;
                    outTeam.matchesLost++;
                } else if(matchOutCome == OUT_TEAM_WINS){
                    outTeam.points += 3;
                    outTeam.matchesWon++;
                    homeTeam.matchesLost++;
                } else {
                    homeTeam.points += 1;
                    outTeam.points += 1;
                    outTeam.matchesDrawed++;
                    homeTeam.matchesDrawed++;
                }
                outTeam.goalsScored += match.outTeamScore;
                outTeam.goalsConcieved += match.homeTeamScore;
                homeTeam.goalsScored += match.homeTeamScore;
                homeTeam.goalsConcieved += match.outTeamScore;
            } else {
                this.allMatchesPlayed = false;
            }

        });

        //if all played matches are done, we put the points:
        this.teams.forEach((team)=>{
            team.points = team.matchesWon*3 + team.matchesDrawed;
        });


    }

    //this get the corresponding to the teamname passed to the method:
    getTeam(name:string) : Team{
        for (let team of this.teams){
            if(team.name == name){
                return team;
            }
        }
    }


    printGroupStanding() {
        this.teams.forEach((team) => {
            console.log(`${team.name}  w:${team.matchesWon}  d:${team.matchesDrawed} l:${team.matchesLost} s:${team.goalsScored} c:${team.goalsConcieved} P:${team.points}`)
        });
        console.log("All played: " + this.allMatchesPlayed);
    }

    printGroupMatches(){
        this.matches.forEach((match) => {
            console.log(`${match.homeTeamName} - ${match.outTeamName} : ${match.homeTeamScore} - ${match.outTeamScore}`);
        })
    }

    getEqualTeams() : Team[][] {
        return this.equalTeams ;
    }

    getAllMatchesPlayed() : boolean {
        return this.allMatchesPlayed;
    }

     addToEqualTeams(teamsToAdd : Team[]) : void {
        if(this.getEqualTeams().length == 0) {
            // first, just add it:
            this.equalTeams.push(teamsToAdd);
        } else {

            var added = false;
            // we need to check is one of the 2 teams already is in on of the arrays that was already added:
            for(var alreadyAddedTeams of this.equalTeams){
                //check if it contains one of them:
                var indexOfExistingTeam = 0;
                for(var teamToAdd of teamsToAdd){
                    //if it already in there, just add the other one as well and we are done:
                    if(alreadyAddedTeams.lastIndexOf(teamToAdd) != -1){
                        break;
                    }
                    indexOfExistingTeam++;
                }
                //if this is 2, this means we did not find the team in alreadyAddedTeams
                if(indexOfExistingTeam != 2){
                    //if is 0 or 1, we found is, so we need to add the other team.
                    let indexOfTeamToAdd = indexOfExistingTeam == 1 ? 0 : 1;
                    //console.log(indexOfTeamToAdd);
                    alreadyAddedTeams.push(teamsToAdd[indexOfTeamToAdd]);
                    added = true;
                    break;
                }
            }
            if (!added){
                // this mean teams are equal 2 on 2
                this.equalTeams.push(teamsToAdd);
            }
        }

    }

    /**
     * This is purely for helping method:
     */
     containsTeamWithName(name:String) : boolean {
        for(var team of this.teams){
            if(team.name == name){
                return true;
            }
        }
        return false
    }

    deserialize(input: any) : Group {
            const group = new Group();
            Object.assign(group, input);

            let newTeams: Team[] = [];
            group.teams.forEach(team => {
                 newTeams.push(Team.deserialize(team));
            });
            group.teams = newTeams;

            let newMatches: Match[] = [];
            group.matches.forEach(match  => {
                newMatches.push(Match.deserialize(match));
            });
            group.matches = newMatches;
            return group;
    }


}





