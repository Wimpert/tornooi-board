
const express  = require('express');
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port     = process.env.PORT || 8888;
var mysql = require('mysql');
var sessionStoreConf = require('./config/SessionStore');
var MySQLStore = require('express-mysql-session')(session);





const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const app  =  express();

app.use(morgan('dev'));


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Add headers
app.use(function (req : any, res: any, next: any) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static('./client/dist'));



var sessionStore = new MySQLStore(sessionStoreConf);
// required for passport
app.use(session({
    secret: 'spelvreugde666',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
} ));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes.js')(app, passport);

app.listen(port , () => console.log(`Example app listening at port ${port}!`));