const passport = require(`passport`),
	LocalStrategy = require(`passport-local`),
	User = require(`../models/User`)
// -> Passport strategy based on User model with plugin (local-mongoose)
passport.use(new LocalStrategy(User.authenticate()))
// -> Serialize and deserialize User in session
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = passport
