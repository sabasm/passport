const express = require(`express`),
	mongoose = require(`mongoose`),
	session = require(`express-session`),
	MongoStore = require(`connect-mongo`)(session),
	bodyParser = require(`body-parser`),
	cookieParser = require(`cookie-parser`),
	passport = require(`./helper/passport`),
	path = require(`path`),
	keys = require(`./keys`)

// -> DB connection
mongoose
	.connect(
		keys.db,
		{useNewUrlParser: true}
	)
	.then(console.log(`Connected to Mongo ✔`))
	.catch(err => console.error(`Error connecting to mongo`, err))
// -> Express App definition
const app = express()

/* -> Middlewares 
		bodyparser: Parse incoming request bodies,
		cookieParser - session with mongoose connection
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: keys.secret,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 24 * 60 * 60
		})
	})
)

// -> views setup
app.set(`views`, path.join(__dirname, `views`))
app.set(`view engine`, `hbs`)
app.use(express.static(path.join(__dirname, `public`)))

// -> initialize auth module and session
app.use(passport.initialize())
app.use(passport.session())

// -> Routes
app.use(`/`, require(`./routes`))
app.use(`/auth`, require(`./routes/auth`))

// -> Port setup
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`listening on: http://localhost:${PORT}`))
