import { KnockoutMatch } from './../models/Match';
import { KnockOutRound } from './../models/KnockOutRound';
import {Team} from "../models/Team";
import {Group} from "../models/Group";
import {Match} from "../models/Match";
import {HOME_TEAM_WINS, OUT_TEAM_WINS} from "../models/Constants";
import {TournamentData} from "../models/TournamentData";

export function getTournamentData() : TournamentData {

    console.log("***** Data generation Starting ****");

    let tournament : TournamentData = new TournamentData();

    let allTeams =  [
        ["JH 't Arsenaal", "Mavito bvba", "PTC De Vlasschaard", "MVC Omniflor"],
            ["Hombres Calientes", "De Carlsbergskes", "Par Hazard", "Stasebeke"],
            ["Dakwerken Dimi", "DRST Eclips", "Hoste-Concept", "MVC The Comix"],
            ["Whoepi-Zwevegem", "Hundes Intertapis", "MVC Café De Gouden Aap", "1255 Snooker Pocket"],
            ["Spectrum", "Re-United", "Samba", "MVC Vermeren"],
            ["FC Dutoit", "Decorte zotten", "Den befkeuning & Co", "Los Borrachos"],
            ["sv Ziggy", "BP De Vlasbloem", "FC Kruisband", "Whoepi-Boys"],
            ["Dynamo Molhoek", "MVC Foliefotografie", "De Seizoeners", "DRST Eclips Zuipteam"],
    ];

    let groupLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

    allTeams.forEach( (groupTeamsNames,index) => {
        let teams: Team[] = [];
        groupTeamsNames.forEach(teamName => {
            teams.push(new Team(teamName));
        });
        let group = new Group ("Group " + groupLetter[index], teams);
        tournament.groups.push(group);
    });

    let rounds=["Round of 16", "Quarter Final", "Semi Final", "Final"];

    //this is no longer used ..
    // rounds.forEach((roundName) => {
    //     //let knockOutRound = new KnockOutRound(roundName, []);

    //     let knockOutRound = new KnockoutRound();
    //     tournament.rounds.push(knockOutRound);
    // });

    return tournament;
}



export function compareTeams(teama: Team, teamb : Team) : number {

    if(teama.points != teamb.points){
        //compare on points:
        return teamb.points - teama.points;
    } else if(teama.matchesWon != teamb.matchesWon){
        // on matchesWon :
        return teamb.matchesWon - teama.matchesWon;
    } else if(teama.goalsScored != teamb.goalsScored){
        // on goals scored:
        return teamb.goalsScored - teama.goalsScored;
    } else if(teama.getGoalsDifference() != teamb.getGoalsDifference()){
        //compare on goal diff:
        return teamb.getGoalsDifference() -teama.getGoalsDifference();
    } else if(teama.internalIndex != teamb.internalIndex){
        //compare on goal diff:
        return teamb.internalIndex -teama.internalIndex;
    }
    return 0
}

export function getMatchesFromTeams(teams : Team[], allMatches : Match[]) : Match[] {
    var teamNames  = new Array<string>();
    teams.forEach((team) => {
       teamNames.push(team.name);
    });

    var returnVal : Match [] = new Array<Match>();
    allMatches.forEach((match) => {
       if(teamNames.indexOf(match.homeTeamName) != -1 && teamNames.indexOf(match.outTeamName) != -1){
             returnVal.push(Object.create(match));
       }

    });
    return returnVal;
}

export function getSubGroup(teams : Team[], originalGroup : Group) :  Group {
     var group = new Group();
     group.teams = []
    for(var t of teams) {
         group.teams.push(Object.create(t));
    }
    // group.teams = teams.slice();
     group.matches = getMatchesFromTeams(teams,originalGroup.matches );
     for(var t of group.teams){
         t.reset();
     }
     return group;
}

export function proccesMatches(group: Group) :void {

    //group.getAllMatchesPlayed() = true;

    group.teams.forEach((team) => {
        team.reset();
    });

    group.matches.forEach((match) => {
        if(match.outTeamScore != undefined && match.homeTeamScore != undefined){
            //this means match is played, so let do what we need to do:
            let matchOutCome = match.getOutCome();
            let homeTeam = group.getTeam(match.homeTeamName);
            let outTeam = group.getTeam(match.outTeamName);
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
            group.allMatchesPlayed = false;
        }

    });

    //if all played matches are done, we put the points:
    group.teams.forEach((team)=>{
        team.points = team.matchesWon*3 + team.matchesDrawed;
    });
}

export function orderTeams(group : Group, complete? : boolean) : void {
    //reset some stuff:
    group.groupNeedsDraw = false;
    group.equalTeams = new Array<Team[]>();
    group.teams.sort( (teama, teamb) => {
        var _ =  compareTeams(teama, teamb);
        if( _ == 0){
            // this means team a and team b are concidered equal:
            group.addToEqualTeams([teama, teamb]);
            //console.log(this.equalTeams);
        }
        return _;
    });

    //TODO:
    //may here check if all matches are played ??
    if(!group.allMatchesPlayed){
        return;
    }

   /* console.log("teams:");
    console.log(group.teams);
    console.log("equalsTeams:");
    console.log(group.equalTeams);*/
    //check if there are equalteams, and do whats needed:
    if(group.equalTeams.length > 0){
        if(group.equalTeams[0].length == group.teams.length){
            //this means all  of the teams were equal, so there is nothing more to do:
            group.groupNeedsDraw = true;
        } else {
            //we need to make a subgroup and do the ordering again:
            for ( var equalTeamsSubGroup of group.equalTeams){
                if(complete == undefined || complete){
                   /* console.log("Before ");
                    group.printGroupStanding();
                    group.printGroupMatches()*/
                }
               var subgroup = getSubGroup(equalTeamsSubGroup, group);
                subgroup.processMatches();

                //watch out here for infinite loops!!!
                /*if (complete == undefined || complete) {
                    orderTeams(subgroup,false);
                }*/

                if(!group.groupNeedsDraw){
                    orderTeams(subgroup, false);
                }

                if(subgroup.groupNeedsDraw){
                    group.groupNeedsDraw =  true;
                }

                //after this subgroups have been ordered, so now we order them in
                //subgroup.printGroupStanding();
                orderAccordingToSubGroups(group, subgroup);

            }

        }
    }
    if(complete == undefined || complete){
       /* console.log("Final print");
        group.printGroupStanding();
        group.printGroupMatches()*/
    }

}

function orderAccordingToSubGroups(group: Group, subGroup : Group){


    //find the index of the first team:
    var index = 0;
    for(var team of group.teams){
        if(subGroup.containsTeamWithName(team.name)){
            break;
        }
        index++
    }

    //get copies of the teams
    var teamsToAdd = getSubGroupFromOriginalGroup(group,subGroup);

    //the first team is in position index in the original group
    //so now start replacing from there:
    for(var teamToAdd of teamsToAdd.teams){
        group.teams.splice(index, 1, teamToAdd);
        index++
    }
}


function getSubGroupFromOriginalGroup (originalGroup  : Group, subGroup : Group ) :  Group{
    var returnVal : Group = new Group();
    returnVal.teams = [];
    for (var subGroupTeam  of subGroup.teams){
        var teamToAdd = Object.assign({}, originalGroup.getTeam((subGroupTeam.name)));
        //var teamToAdd = Object.create(originalGroup.getTeam(subGroupTeam.name));
        returnVal.teams.push(teamToAdd);
    }
    return returnVal;

}

export function getMatchesOrderedForTimeSetting(tournament: TournamentData) : Match[] {
    var returnVal: Match[]= [];
    tournament.groups.forEach(function (group: Group) {
        group.matches.forEach(function (match: Match) {
            returnVal.push(match);
        })
    });

    returnVal.sort(function (a,b) {
        return a.matchNumber - b.matchNumber;
    })

    tournament.rounds.forEach(function (round: KnockOutRound) {
        for(var i = 8 ; i < 16 ; i ++){
            returnVal.push(round.matches[i]);
        }

        for(var i = 0 ; i < 8 ; i ++){
            returnVal.push(round.matches[i]);
        }
    });
    return returnVal;
}

export function getMatchesOrderedByMatchNr(tournament: any) : any{

  var returnVal :any = [];
  tournament.groups.forEach(function (group: any) {
    group.matches.forEach(function (match: any) {
        returnVal.push(match);
    })
  });

    tournament.rounds.forEach(function (round: any) {
        round.matches.forEach(function (match: any) {
            returnVal.push(match);
        })
    });



    returnVal.sort((match1:any, match2: any) => {
        return match1.matchNumber - match2.matchNumber;
    });
    return returnVal;
}

export function addToNextRound(tournament : any,groupIndex: any) {
  var achtsteFinale = tournament.rounds[0];
    if (groupIndex == 0) {
      achtsteFinale.matches[0].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[4].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[8].homeTeamName = tournament.groups[groupIndex].teams[2].name;
      achtsteFinale.matches[12].outTeamName = tournament.groups[groupIndex].teams[3].name;

    } else if (groupIndex == 1) {
      achtsteFinale.matches[1].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[5].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[9].homeTeamName = tournament.groups[groupIndex].teams[2].name;
      achtsteFinale.matches[13].outTeamName = tournament.groups[groupIndex].teams[3].name;

    } else if (groupIndex == 2) {
      achtsteFinale.matches[2].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[6].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[10].homeTeamName = tournament.groups[groupIndex].teams[2].name;
      achtsteFinale.matches[14].outTeamName = tournament.groups[groupIndex].teams[3].name;
    } else if (groupIndex == 3) {
      achtsteFinale.matches[3].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[7].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[11].homeTeamName = tournament.groups[groupIndex].teams[2].name;
      achtsteFinale.matches[15].outTeamName = tournament.groups[groupIndex].teams[3].name;
    } else if (groupIndex == 4) {
      achtsteFinale.matches[0].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[4].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[8].outTeamName = tournament.groups[groupIndex].teams[3].name;
      achtsteFinale.matches[12].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    } else if (groupIndex == 5) {
      achtsteFinale.matches[1].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[5].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[9].outTeamName = tournament.groups[groupIndex].teams[3].name;
      achtsteFinale.matches[13].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    } else if (groupIndex == 6) {
      achtsteFinale.matches[2].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[6].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[10].outTeamName = tournament.groups[groupIndex].teams[3].name;
      achtsteFinale.matches[14].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    } else if (groupIndex == 7) {
      achtsteFinale.matches[3].outTeamName = tournament.groups[groupIndex].teams[1].name;
      achtsteFinale.matches[7].homeTeamName = tournament.groups[groupIndex].teams[0].name;
      achtsteFinale.matches[11].outTeamName = tournament.groups[groupIndex].teams[3].name;
      achtsteFinale.matches[15].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    }
  
}

export function processRound(tournament: TournamentData,roundIndex: number) {
    if(roundIndex == tournament.rounds.length){
        return;
    }
    let correction = 0;
    const round = tournament.rounds[roundIndex];
    
    const nextRound = tournament.rounds[roundIndex+1];

   round.matches.forEach((match:KnockoutMatch, index) => {
        let winnernumber: number;
        let loserNumber: number;
         if(index%2 == 0 ){
             if(index != 0){
                correction++;
            }
            if(correction == round.numberOfPlaces/4){
                correction = 0;
            }
            //console.log("even", index , "correction", correction);
             winnernumber = match.matchNumber+16 -correction;
             loserNumber = match.matchNumber+16+round.numberOfPlaces/4 - correction;
            //console.log(winnernumber, loserNumber);
            
        } else {
            //console.log("odd", index, "correction", correction);
            winnernumber = match.matchNumber+15 -correction;
            loserNumber = match.matchNumber+15+round.numberOfPlaces/4 - correction;
            //console.log(winnernumber, loserNumber);
        }

        const winnerMatch = nextRound.matches.find((match) => {
            return match.matchNumber == winnernumber;
        });

        const loserMatch = nextRound.matches.find((match) => {
            return match.matchNumber == loserNumber;
        });

        if(index%2 == 0){
            winnerMatch.homeTeamName = match.getWinner();
            loserMatch.homeTeamName = match.getLoser();
        } else {
            winnerMatch.outTeamName = match.getWinner();
            loserMatch.outTeamName = match.getLoser();
        }
        

      });
    }




// *** Frontend Helper methods: *** //
export function replaceBasedOnName(newGroup : Group, groups :Group[]) : void {
    let index = findIndexOfGroupBasedOnName(newGroup, groups);
    groups[index] = newGroup;
}

function findIndexOfGroupBasedOnName(groupToFind:Group , groups : Group[]) : any {

    for(let i in groups){
        if(groups[i].groupname == groupToFind.groupname){
            return i;
        }
    }
}
// *** END *** //
