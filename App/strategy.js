const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;

passport.use('login', new LocalStrat({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, cb) => {
    fundUser(username, function(err, user) {
        if (err) return cb(err);
        if (!user) return cb(null, false, { message: 'Incorrect email.' });
        bcrypt.compare(password, user.password, function(err, res) {
            if (res) return cb(null, user);
            else return cb(null, false, { message: 'Incorrect password.' });
        });
    });
}));

module.exports = {
    pass: passport
}