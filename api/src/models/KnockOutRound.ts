import {KnockoutMatch} from "./Match";

export class KnockOutRound {

    name: string;
    matches: KnockoutMatch[];

    constructor(name: string, matches : KnockoutMatch[]){
        this.name =  name;
        this.matches =  matches;
    }

}