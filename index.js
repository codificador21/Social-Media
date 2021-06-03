const express = require('express');
//Cookie parser
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//installed using npm install express-session
const session = require('express-session');

// Used for session cookie(including "express-session")
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
//using the custom flash middleware we made in config
const customWare = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(expressLayouts);
//extract scripts and styles from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// ** READ EXPRESS SESSION DOCUMENTATION FOR BETTER CLEARITY **
// Using Mongo-Store tostore the session cookies in the db
app.use(session({
    name : 'Social Media Website',
    //TODO : change the secret before deployment in the production mode
    secret: 'abcd',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:  MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/socialmedia_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

//use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);   // interpolation
        return;
    }
    console.log(`Server is ruuning on port : ${port}`);
})