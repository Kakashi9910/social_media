import express  from 'express';
import cookieParser from 'cookie-parser'; 
const app = express();
const port = 8000;
import expressLayouts from 'express-ejs-layouts';
import db from "./config/mongoose.js"
// used for session cookie
import session from 'express-session';
// const session = require('express-session');
import passport from 'passport';
import passportLocal from "./config/passport-local-strategy.js"
// const MongoStore = require('connect-mongo')(session);
import connectMongo from 'connect-mongo';
const MongoStore=connectMongo(session);
import sassMiddleware from 'node-sass-middleware';
import router from './routes/index.js';
import bodyParser from 'body-parser'
// const sassMiddleware =require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(bodyParser.json({extended:true}))
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',router);

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
