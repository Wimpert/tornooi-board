// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the userService model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
var messages = require('../../models/messages');

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the userService for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the userService
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {

                // find a userService whose email is the same as the forms email
                // we are checking to see if the userService trying to login already exists
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        if(rows[0].username == username){
                            return done(null, false, messages.signUpMessages.userNameInUse);
                        } else {
                            return done(new Error("Oops, not good ! !"));
                        }

                    } else {
                        // if there is no userService with that username
                        // create the userService

                        var insertQuery = "INSERT INTO users ( username, password, isAdmin ) values (?,?,?)";
                        connection.query(insertQuery,["de_jackies", bcrypt.hashSync("spelvreugde666", null, null), "Y"],function(err, rows) {
                            if(err){return done(err);}
                           // console.log(rows);
                            return done(null, rows[0]);
                        });
                    }
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with email and password from our form
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, messages.loginMessages.comboNotFound); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the userService is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, messages.loginMessages.comboNotFound); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful userService
                    return done(null, rows[0]);
                });
            })
    );
};