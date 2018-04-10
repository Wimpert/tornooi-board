import {Request, Response} from "express";
import {Tournament} from "../models/Tournament";
import {getTournament} from "../utils/TournamentUtils";

const mysql = require('mysql');
const dbconfig = require('./config/database');
const connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


export class UserUtils{

}


export class PronostiekUtils{

    public static getPronostiek(req : Request, res : Response)  {
        /*connection.query("SELECT * FROM pronostiek WHERE userId = ?",[req.user.id], function(err : Error, rows : any){
                        if (err)
                            throw err;
                        if(rows.length == 1){
                            let pronostiek = rows[0];
                            let stringValue = pronostiek.tournament.toString('utf8');
                            pronostiek.tournament = JSON.parse(stringValue);
                            res.send(pronostiek);
                        } else {
                            //this means there is none, so lets create one;
                            let prono : Pronostiek = new Pronostiek(req.user.id);
                            prono.tournament =  getTournament();
                            res.send(prono);
                        }
         });*/
    };

    public static savePronostiek(req : Request, res : Response)  {

        /*const prono = req.body;
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
            connection.query(query,[req.user.id, now, now, JSON.stringify(prono.tournament)],function(err : Error, rows : any) {
                if(err){throw  err;}
                prono.id = rows.insertId;
                res.send(prono);
            });

        }*/
    };
}