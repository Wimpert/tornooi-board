import {KnockoutMatch} from "./Match";

export class KnockOutRound {

    name: string;
    matches: KnockoutMatch[];
    numberOfPlaces : number;
    show: boolean;

    constructor(numberOfPlaces:number, name:string){
        this.numberOfPlaces = numberOfPlaces;
        this.matches = [];
        this.name=name;
        this.show = false;
        var place = 1;
        var index = 0;
        for (var i = 0 ; i < 16 ; i++){
            this.matches[i] =  new KnockoutMatch();
            this.matches[i].from = place;
            this.matches[i].to = place+numberOfPlaces-1;
            index = index+2;
            if(index%numberOfPlaces == 0){
                place=place+numberOfPlaces;
            }
        }
    }


    static deserialize(input: any) {
        const round = new KnockOutRound(input.numberOfPlaces, input.name);
        Object.assign(round,input);
        var newMatches: any[] = [];
        round.matches.forEach((match) => {

            newMatches.push(KnockoutMatch.deserialize(match));
        });
        round.matches = newMatches;
        return round;
    }

}