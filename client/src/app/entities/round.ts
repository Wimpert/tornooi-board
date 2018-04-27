import {KnockOutMatch} from "./knockout-match";
export class Round {


    matches : KnockOutMatch[];
    name: string;
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
            this.matches[i] =  new KnockOutMatch(place, place+numberOfPlaces-1);
            index = index+2;
            if(index%numberOfPlaces == 0){
                place=place+numberOfPlaces;
            }
        }
    }




}
