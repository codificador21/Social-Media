const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//  * * READ PASSPORT.JS DOCUMENTATION FOR BETTER CLEARITY!!! * *

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        //find a user and establish an identity
        User.findOne({email: email},function(err,user){
            // first email is the property of this func, second email is the value from db we are passing
            if(err){ 
            req.flash('error',err);
            return done(err);
        }
        
        if (!user || user.password!=password){
            req.flash('error','Invalid Username/Password');
            return done(null,false);
        }  

        return done(null,user);

        });
    }
   ));


   //Serialse the user to decide which keys to be kept in the cookies
   passport.serializeUser(function(user,done){
       done(null,user.id);
   });

   //deserealise the user from the key in the cookies
   passport.deserializeUser(function(id,done){
       User.findById(id,function(err,user){
           if (err){
            console.log("Error in finding user --> Passport") 
            return done(err);
        }

        return done(null,user);
       })
   });

   //chech if user is autrhenticated
   passport.checkAuthentication = function(req,res,next){
    //If the reason is signed in, then pass on the request to the next function(Controller's action)   
    if(req.isAuthenticated()){
           return next();
       }

       //If the user is  not signed in
       return res.redirect('/users/sign-in');
   }

   passport.setAuthenticatedUser = function(req,res,next){
       if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just semdimg this to the locals for the views   
        res.locals.user = req.user;

       }
       next();
   }

   module.exports = passport;