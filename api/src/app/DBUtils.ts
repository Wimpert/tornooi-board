import {Request, Response} from "express";
import {Tournament} from "../models/Tournament";
import {getTournamentData} from "../utils/TournamentUtils";
const mysql = require('mysql');
const dbconfig = require('./config/database');
const connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


export class TournamentUtils{

    public static getAllTournaments(req: Request, res: Response){
        connection.query("SELECT * FROM tournaments", function(err : Error, rows : any){
            if (err)
                throw err;
            if(rows.length >= 1){
                let returnVal = [];
                for(let tournament of rows){
                    let stringValue = tournament.data.toString('utf8');
                    tournament.data = JSON.parse(stringValue);
                    returnVal.push(tournament)
                }

                res.send(returnVal);
            } else {
                res.send([]);
            }
        });
    }

    public static createNewTournament(req: Request, res: Response){
        let tournament  = new Tournament();
        console.log(tournament);
        const query = "INSERT INTO tournaments (isRef, data, creationdate, lastupdate ) values (?,?,?,?)";
        connection.query(query, [tournament.isRef, JSON.stringify(tournament.data), tournament.creationdate, tournament.lastupdate], function(err : Error, rows : any){
            if (err)
                throw err;
            console.log(rows);
            tournament.id = rows.insertId;
            res.send(tournament);
        });
    }

    public static getTournament(req: Request, res: Response){
        connection.query("SELECT * FROM tournaments WHERE id = ?",[req.params['id']], function(err : Error, rows : any){
        if (err)
            throw err;
        if(rows.length >= 1){
            let tournament = rows[0];
            let stringValue = tournament.data.toString('utf8');
            tournament.data = JSON.parse(stringValue);
            res.send(tournament);
        } else {
            res.sendStatus(404);
        }
    });
    }

    public static saveTournament(req: Request, res: Response){
        const tournament = req.body;
        console.log(tournament);
        const query = "UPDATE tournaments SET  lastupdate = ? , data = ?,  isRef = ? where id = ? ";
        const now = new Date()
        connection.query(query,[now, JSON.stringify(tournament.data), tournament.isRef, tournament.id],function(err : Error ) {
            if(err){throw  err;}
            tournament.lastupdate = now ;
            res.send(tournament);
        });
    }

}


/*
export class PronostiekUtils{

    public static getPronostiek(req : Request, res : Response)  {
        /!*connection.query("SELECT * FROM pronostiek WHERE userId = ?",[req.userService.id], function(err : Error, rows : any){
                        if (err)
                            throw err;
                        if(rows.length == 1){
                            let pronostiek = rows[0];
                            let stringValue = pronostiek.tournament.toString('utf8');
                            pronostiek.tournament = JSON.parse(stringValue);
                            res.send(pronostiek);
                        } else {
                            //this means there is none, so lets create one;
                            let prono : Pronostiek = new Pronostiek(req.userService.id);
                            prono.tournament =  getTournament();
                            res.send(prono);
                        }
         });*!/
    };

    public static savePronostiek(req : Request, res : Response)  {

        /!*const prono = req.body;
        const now = new Date();

        let query : string;

        if(prono.id){
            query = "UPDATE pronostiek SET  lastupdate = ? , tournament = ? where id = ? ";
            connection.query(query,[now, JSON.stringify(prono.tournament), prono.id],function(err : Error ) {
                if(err){throw  err;}
                prono.lastupdate = now ;
                res.send(prono);
            });

        } else {
            query = "INSERT INTO pronostiek ( userId, creationdate, lastupdate, tournament ) values (?,?,?,?)";
            connection.query(query,[req.userService.id, now, now, JSON.stringify(prono.tournament)],function(err : Error, rows : any) {
                if(err){throw  err;}
                prono.id = rows.insertId;
                res.send(prono);
            });

        }*!/
    };
}*/
