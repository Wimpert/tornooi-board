var messages = require('../models/messages');
var DBUtils = require('./DBUtils');
var constants =  require('../models/Constants')

module.exports = function(app, passport) {



   /* app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/api', // redirect to the secure profile section
        failureRedirect : '/api/login', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
    }),
        function(req, res) {
            console.log("test");
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
                console.log(req.session);
            }
            res.redirect('/test');
    });
*/
    // process the signup form
   /* app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/profile', // redirect to the secure profile section
        failureRedirect : '/api/signup', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
    }));*/

  app.post('/api/login' , function (req, res, next) {
       passport.authenticate('local-login', function (err, user ,info) {

           if(err){
               return next(err)
           }
           if(!user){
               if(info){
                   return res.send(409, info);
               }
           }
           req.logIn(user, function (err) {
               if (err) {
                   return next(err);
               }

               //here we set the cookies maxage:
               if(req.body.remember){
                  //"we want to be remebered:"
                   const tenYears = 1000*60*60*24*365*10;
                   req.session.cookie.maxAge = tenYears;
                   res.cookie(constants.COOKIE_NAME,user.id,{maxAge:tenYears});
               } else {
                   res.cookie(constants.COOKIE_NAME,user.id);
               }

               return res.send(200, user);
           });
       })(req, res, next);
   });


    app.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
           if (err) {
                return next(err);
            }
            if (!user) {
                if(info){
                    return res.send(409, info)
                }
                return res.redirect('');
           }
            req.logIn(user, function(err) {

                if (err) { return next(err); }

                //here we set the cookies maxage:
                if(req.body.remember){
                    //"we want to be remebered:"
                    const tenYears = 1000*60*60*24*365*10;
                    req.session.cookie.maxAge = tenYears;
                    res.cookie(constants.COOKIE_NAME,user.id,{maxAge:tenYears});
                } else {
                    res.cookie(constants.COOKIE_NAME,user.id);
                }

                console.log("done");

                return res.send(200, user);
            });
        })(req, res, next);
    });


    app.get('/api', function (req, res) {
        res.send("hellow there");
    })

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    /*app.get('/api/profile', isLoggedIn, function(req, res) {
        console.log(req.userService);
        console.log(req.session);
        res.send({
            userService : req.userService // get the userService out of session and pass to template
        });
    });*/

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.cookie(constants.COOKIE_NAME,"",{expires:new Date()});
        res.send(200, messages.logoutMessages.success.logoutSuccess);
    });


    /**
     * this will return the pronotiek base on who is logged in:
     */
    //app.get('/api/tournament/:tournamentId', isLoggedIn, DBUtils.PronostiekUtils.getPronostiek);
    app.get('/api/tournament', DBUtils.TournamentUtils.getAllTournaments);
    app.get('/api/tournament/:id', DBUtils.TournamentUtils.getTournament);
    app.post('/api/tournament', isLoggedIn, DBUtils.TournamentUtils.saveTournament);


};


// route middleware to make sure
function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    // if userService is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send(401, "ah ah ah, nice try !");
}