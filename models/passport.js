const configAuth = require('../utils/auth');
const User = require('../database/user-coll');

const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id','displayName','email','first_name','last_name','middle_name']
    },

    function(accessToken, refreshToken, profile, done) {

        //console.log(profile);
        console.log({accessToken, refreshToken, profile, done});
        
        process.nextTick(async function(){
            User.findOne({'facebook.id': profile.id}, async function(err, user){
                if(err) return done(err);
                if(user)
                    return done(null, user);
                else{
                   
                    let newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.displayName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.email = profile.emails[0].value;

                    newUser.save().then(user => {
                        return done(null, user)
                    }).catch(e => {

                        console.log(e + ' ');
                        return (null, false)
                    })
                }
            })
        })
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
        }),
        
    passport.deserializeUser((id, done) => {
        User.findOne({id}, (err, user) => {
            done(null, user)
        })
    })
    
}


