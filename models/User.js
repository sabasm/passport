var mongoose = require(`mongoose`)
var passportLocalMongoose = require(`passport-local-mongoose`)
// -> basic user schema definition
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
})
// -> set plugin into UserSchema
UserSchema.plugin(passportLocalMongoose)
// -> export userSchema with plugin
module.exports = mongoose.model(`User`, UserSchema)
