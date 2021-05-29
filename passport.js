const User = require('./models/user');
const password = require('passport');
const LocalStratregy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const passport = require('passport');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStratregy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        return User.findOne({ email: email, password: password }).then(user => {
            if (!user) return cb(null, false, { message: 'Incorrect email or password.' });
            return cb(null, user, { message: 'logged in successfully' });
        }).catch(err => {
            cb(err);
        });
    }
)
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    function (jwtPayload, cb) {
        let data = {
            id: jwtPayload.id,
            name: jwtPayload.name,
            email: jwtPayload.email
        };
        cb(null, data);
    }
));