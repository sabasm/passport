process.env.NODE_ENV === `production`
	? (module.exports = require(`./prod`))
	: (module.exports = require(`./dev`))
// export a set of keys based on enviroment