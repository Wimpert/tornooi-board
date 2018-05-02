import { MATCH_IS_DRAW } from './Constants';
import { Refs } from './Refs';
import { KnockOutRound } from './KnockOutRound';

import { Team } from './Team';
import { Group } from './Group';
import { getMatchesOrderedForTimeSetting, getMatchesOrderedByMatchNr, addToNextRound } from '../utils/TournamentUtils';
import {Match} from "./Match";





export class TournamentData {

  teams : Team[];
  groups : Group[];
  rounds: KnockOutRound[];
  refreshInterVal:number;
  showInfoTime:number;
  showSponserTime:number;

  name: string = new Date().toISOString();
  id: string ;


  static getTournamentDataToStart() {
    const data = new TournamentData();
    var groupLetters =  ["A","B","C","D","E","F","G","H"];
    var groupPrefix :string =  "Poele";
    var groundPrefix = "";
    data.refreshInterVal = 1000;
      data.showInfoTime = 30000;
      data.showSponserTime = 5000;
    var startTime = new Date();
    startTime.setUTCMonth(4);
    startTime.setUTCDate(10);
    startTime.setUTCFullYear(2018);
    startTime.setUTCHours(7);
    startTime.setUTCMinutes(0);
    startTime.setUTCSeconds(0);
    startTime.setUTCMilliseconds(0);

    var teams : string[][] = [
      ["JH 't Arsenaal", "Mavito bvba", "PTC De Vlasschaard", "MVC Omniflor"],
          ["Hombres Calientes", "De Carlsbergskes", "Par Hazard", "Stasebeke"],
          ["Dakwerken Dimi", "DRST Eclips", "Hoste-Concept", "MVC The Comix"],
          ["Whoepi-Zwevegem", "Hundes Intertapis", "MVC Café De Gouden Aap", "1255 Snooker Pocket"],
          ["Spectrum", "Re-United", "Samba", "MVC Vermeren"],
          ["FC Dutoit", "Decorte zotten", "Den befkeuning & Co", "Los Borrachos"],
          ["sv Ziggy", "BP De Vlasbloem", "FC Kruisband", "Whoepi-Boys"],
          ["Dynamo Molhoek", "MVC Foliefotografie", "De Seizoeners", "DRST Eclips Zuipteam"],
  ]

    



    var index = 0;
      data.groups = [];

    groupLetters.forEach((val) => {
      const teamsToAdd: Team[] = []
      teams[index].forEach(teamName => {
        teamsToAdd.push(new Team(teamName))
      });
      let group = new Group(groupPrefix+" " +val, teamsToAdd);
        data.groups.push(group);
      index++;
    });

      data.rounds = [];
      data.rounds.push(new KnockOutRound(16, "Achste Finales") );
      data.rounds.push(new KnockOutRound(8, "Kwart Finales"));
      data.rounds.push(new KnockOutRound(4,"Halve Finales"));
      data.rounds.push(new KnockOutRound(2, "Finales"));

    
    // this.rounds.push(new KnockOutRound( "Achste Finales", []));
    // this.rounds.push(new KnockOutRound( "Kwart Finales", []));
    // this.rounds.push(new KnockOutRound("Halve Finales", []));
    // this.rounds.push(new KnockOutRound( "Finales", []));


      //assign match numbers:
      let matchNumber = 1;
      for(var i = 0 ;  i < 6 ; i=i+2){
          data.groups.forEach(function (group) {
              group.matches[i].matchNumber = matchNumber++;
              group.matches[i+1].matchNumber = matchNumber++;
          })
      }

      data.rounds.forEach(function (round) {
        round.matches.forEach(function (match) {
            match.matchNumber = matchNumber++;
        })
      });


    var orderedMatches = getMatchesOrderedForTimeSetting(data);
    var playround = 0;
    var matchInRound = 0;
    var groundNumber = 1;
    
    
    orderedMatches.forEach( (match, index) => {

      if(match.matchNumber >= 97 && match.matchNumber < 105){
        if(match.matchNumber == 97){
          startTime.setUTCHours(16);
          startTime.setUTCMinutes(0);
        } else {
          startTime.setUTCHours(15);
          startTime.setUTCMinutes(30);
        }
      }

      match.startTime = new Date(startTime);
      match.terrain = groundPrefix+groundNumber;
      groundNumber++;
      ++matchInRound;

      //console.log(match.matchNumber + " - " + match.startTime + " - " + match.terrain);


      //setting grounds:
      if(matchInRound != 0 && matchInRound%8==0){

        var minutes = 30;
        if(playround == 5 ){
          minutes = 60;
        } else if(playround > 5){
          minutes = 45;
        }
        startTime.setTime(startTime.getTime()+minutes*60*1000);
       // console.log(startTime);
        matchInRound = 0;
        groundNumber = 1;
        playround++;
      }
    });

    orderedMatches = getMatchesOrderedByMatchNr(data);
    orderedMatches.forEach(function (match,index) {
      match.ref = Refs.list[index];
    });


    //for developement:
    /*this.groups.forEach((group, index) => {
      group.matches.forEach((match) => {
        match.homeTeamScore = Math.round(Math.random()*5);
        match.outTeamScore = Math.round(Math.random()*5);
      });
      group.orderTeams();
      addToNextRound(this, index);
      this.rounds[0].matches.forEach((match)=> {
        match.homeTeamScore = Math.round(Math.random()*5);
        match.outTeamScore = Math.round(Math.random()*5);
        
        if(match.getOutCome() == MATCH_IS_DRAW){
          match.homeTeamPenaltyScore = Math.round(Math.random()*5);
          match.outTeamPenaltyScore = Math.round(Math.random()*5);
          while(match.getOutCome() ===  MATCH_IS_DRAW){
            match.outTeamPenaltyScore = Math.round(Math.random()*5);
          }
        }
      });
    });*/



    //end
      return data;


  }

  getNextGround(prevGroundNumber: any): number{
    if(prevGroundNumber == 8 ){
        return 1;
    }
    return ++prevGroundNumber;
  }

    static deserialize(input: any) : TournamentData {

        const returnVal = new TournamentData();
        //console.log(input);
        Object.assign(returnVal, input);
        const newGroups = [];
        returnVal.groups.forEach((group) => {

            newGroups.push(Group.deserialize(group));

        });
        returnVal.groups = newGroups;

        const newRounds = [];
        returnVal.rounds.forEach((round) => {
          newRounds.push(KnockOutRound.deserialize(round));
        });
        returnVal.rounds = newRounds;

        return returnVal;

    }




}
