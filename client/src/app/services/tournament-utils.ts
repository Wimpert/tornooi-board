// /**
//  * Created by whv2li8 on 11/04/2017.
//  */

// function processMatch(group, match) {

//   var homeTeam = getTeam(group, match.homeTeam.name);
//   var outTeam = getTeam(group, match.outTeam.name);

//   homeTeam.matchesPlayed++;
//   outTeam.matchesPlayed++;

//   if(match.homeTeamScore > match.outTeamScore){
//     homeTeam.matchesWon++;
//     outTeam.matchesLost++;
//   } else  if (match.homeTeamScore < match.outTeamScore) {
//     outTeam.matchesWon++;
//     homeTeam.matchesLost++;
//   } else {
//     outTeam.matchesDrawed++;
//     homeTeam.matchesDrawed++;
//   }

//   homeTeam.goalsScored = homeTeam.goalsScored + match.homeTeamScore;
//   homeTeam.goalsConcieved = homeTeam.goalsConcieved + match.outTeamScore;

//   outTeam.goalsScored = outTeam.goalsScored + match.outTeamScore;
//   outTeam.goalsConcieved = outTeam.goalsConcieved + match.homeTeamScore;


// }

// function resetGroup(group) {

//   group.teams.forEach(function (team) {
//     team.matchesPlayed = 0;
//     team.matchesWon = 0;
//     team.matchesLost = 0;
//     team.matchesDrawed = 0;
//     team.goalsScored = 0;
//     team.goalsConcieved = 0;

//   })

// }

// function getTeam(group, teamName){
//   for(var index in group.teams){
//     if(group.teams[index].name == teamName){
//       //found:
//       return group.teams[index];
//     }
//   }
// }

// function calculatePoints(group) {
//   group.teams.forEach(function (team) {
//     team.points = team.matchesWon*3 + team.matchesDrawed*1;
//   })
// }

// function getMatch(teamName1, teamName2){
//   //console.log("getting match");
//   for(var index in this.group.matches) {
//     if((this.group.matches[index].homeTeam.name == teamName1 && this.group.matches[index].outTeam.name == teamName2)
//         || ( this.group.matches[index].outTeam.name == teamName1 && this.group.matches[index].homeTeam.name == teamName2)){
//       //console.log("returning :" + this.group.matches[index]);
//       return this.group.matches[index];
//     }
//   }
// }

// function sortGroupFunction(team1, team2){
//   if(team2.points != team1.points) {
//     return team2.points-team1.points;
//   } else if(team1.goalsScored!=team2.goalsScored) {
//     return team2.goalsScored - team1.goalsScored;
//   } else if(team1.goalsConcieved!=team2.goalsConcieved){
//     return team1.goalsConcieved - team2.goalsConcieved;
//   }

//   //get onderling duel:
//   var dual = getMatch(team1.name,team2.name);
//   var team1Score = getScore(dual, team1);
//   var team2Score = getScore(dual, team2);
//   return team2Score - team1Score;
// }

// function getScore(match, team){
//   if(match.homeTeam.name == team.name){
//     return match.homeTeamScore;
//   } else if(match.outTeam.name == team.name){
//     return match.outTeamScore;
//   }
// }

// function addToNextRound(tournament,groupIndex) {
//   var achtsteFinale = tournament.rounds[0];
//   if(!tournament.groups[groupIndex].isLoting) {
//     if (groupIndex == 0) {
//       achtsteFinale.matches[0].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[4].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[8].homeTeam = tournament.groups[groupIndex].teams[2];
//       achtsteFinale.matches[12].outTeam = tournament.groups[groupIndex].teams[3];

//     } else if (groupIndex == 1) {
//       achtsteFinale.matches[1].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[5].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[9].homeTeam = tournament.groups[groupIndex].teams[2];
//       achtsteFinale.matches[13].outTeam = tournament.groups[groupIndex].teams[3];

//     } else if (groupIndex == 2) {
//       achtsteFinale.matches[2].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[6].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[10].homeTeam = tournament.groups[groupIndex].teams[2];
//       achtsteFinale.matches[14].outTeam = tournament.groups[groupIndex].teams[3];
//     } else if (groupIndex == 3) {
//       achtsteFinale.matches[3].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[7].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[11].homeTeam = tournament.groups[groupIndex].teams[2];
//       achtsteFinale.matches[15].outTeam = tournament.groups[groupIndex].teams[3];
//     } else if (groupIndex == 4) {
//       achtsteFinale.matches[0].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[4].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[8].outTeam = tournament.groups[groupIndex].teams[3];
//       achtsteFinale.matches[12].homeTeam = tournament.groups[groupIndex].teams[2];
//     } else if (groupIndex == 5) {
//       achtsteFinale.matches[1].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[5].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[9].outTeam = tournament.groups[groupIndex].teams[3];
//       achtsteFinale.matches[13].homeTeam = tournament.groups[groupIndex].teams[2];
//     } else if (groupIndex == 6) {
//       achtsteFinale.matches[2].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[6].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[10].outTeam = tournament.groups[groupIndex].teams[3];
//       achtsteFinale.matches[14].homeTeam = tournament.groups[groupIndex].teams[2];
//     } else if (groupIndex == 7) {
//       achtsteFinale.matches[3].outTeam = tournament.groups[groupIndex].teams[1];
//       achtsteFinale.matches[7].homeTeam = tournament.groups[groupIndex].teams[0];
//       achtsteFinale.matches[11].outTeam = tournament.groups[groupIndex].teams[3];
//       achtsteFinale.matches[15].homeTeam = tournament.groups[groupIndex].teams[2];
//     }
//   }
// }

// function getMatchesOrderedByMatchNr(tournament) {

//   var returnVal = [];
//   tournament.groups.forEach(function (group) {
//     group.matches.forEach(function (match) {
//         returnVal.push(match);
//     })
//   });

//     tournament.rounds.forEach(function (round) {
//         round.matches.forEach(function (match) {
//             returnVal.push(match);
//         })
//     });



//     returnVal.sort((match1, match2) => {
//         return match1.matchNumber - match2.matchNumber;
//     });
//     return returnVal;
// }

// function getMatchesOrderedForTimeSetting(tournament) {
//     var returnVal = [];
//     tournament.groups.forEach(function (group) {
//         group.matches.forEach(function (match) {
//             returnVal.push(match);
//         })
//     });

//     returnVal.sort(function (a,b) {
//         return a.matchNumber - b.matchNumber;
//     })

//     tournament.rounds.forEach(function (round) {
//         for(var i = 8 ; i < 16 ; i ++){
//             returnVal.push(round.matches[i]);
//         }

//         for(var i = 0 ; i < 8 ; i ++){
//             returnVal.push(round.matches[i]);
//         }
//     });
//     return returnVal;
// }

// function isHomeTeam(match, team){
//   return match.homeTeam.name == team.name;
// }

// function isWinner(match, team) {

//   if(match.homeTeamScore != undefined && match.outTeamScore  != undefined){
//     if(match.homeTeamScore > match.outTeamScore){
//         //home wins
//        return isHomeTeam(match,team);
//     } else if(match.homeTeamScore > match.outTeamScore){
//         //out wins
//       return !isHomeTeam(match,team);
//     } else {
//       //draw
//       if(match.homeTeamPenaltyScore  != undefined && match.outTeamPenaltyScore  != undefined){
//         if(match.homeTeamPenaltyScore > match.outTeamPenaltyScore){
//           return isHomeTeam(match, team);
//         } else if(match.homeTeamPenaltyScore < match.outTeamPenaltyScore){
//           return !isHomeTeam(match, team);
//         }

//       }
//     }
//   }
//   return false;

// }

// function getWinner(match) {
//   if(isWinner(match, match.homeTeam)){
//     return match.homeTeam;
//   } else if(isWinner(match, match.outTeam)){
//     return match.outTeam;
//   }
// }

// function getLoser(match) {
//   if(!isWinner(match, match.homeTeam)){
//     return match.homeTeam;
//   } else if(!isWinner(match, match.outTeam)){
//     return match.outTeam;
//   }
// }

// function processRound(round) {
//   console.log("processing: " + round);
//   var to_add =16;
//   var second_time = true;
//   round.matches.forEach((match, index) => {
//     var old_number = match.matchNumber;

//   var winner_number =   to_add + old_number;
//   //console.log(to_add + " + " +  old_number +"=" + winner_number);
//   console.log(old_number + " - " + winner_number);
//   if(second_time){
//     to_add--;
//     second_time = false;
//   } else {
//     second_time = true;
//   }

// })
// }


// var TournamentUtils = {

//    order : function(tournament){
//      var groupIndex = 0;
//       tournament.groups.forEach(function (group) {
//         var allMatchesCompleted = true;
//         //reset everything:
//         resetGroup(group);
//           //looping over the groups:
//           group.matches.forEach(function (match) {
//             //looping over matches in groups:
//             if(match.homeTeamScore != undefined && match.outTeamScore != undefined){
//               //match is completed:
//               processMatch(group, match);
//             } else {
//               allMatchesCompleted = false;
//             }
//           });
//         calculatePoints(group);
//         this.group = group;
//         group.teams.sort(sortGroupFunction);

//         if(allMatchesCompleted){
//           //addToNextRound(tournament,groupIndex);
//         }
//         groupIndex++;

//       });
//    },

//    addToNextRound : addToNextRound,

//   getMatchesOrderedByMatchNr : getMatchesOrderedByMatchNr,

//     getMatchesOrderedForTimeSetting : getMatchesOrderedForTimeSetting,

//   isWinner :  isWinner,

//   processRound : processRound


// }

// // if(typeof module !== 'undefined' && module.exports) {
// //   module.exports = TournamentUtils;
// // } else {
// //   window.TournamentUtils = TournamentUtils;
// // }

// module.exports = TournamentUtils;
