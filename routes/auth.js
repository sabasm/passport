const express = require(`express`),
	router = express.Router(), // Router instance
	passport = require(`../helper/passport`),
	User = require(`../models/User`) // User model

// signup routes
router.get(`/`, (req, res) => res.render(`register`))

router.post(`/`, function(req, res) {
	User.register( new User({
			username: req.body.username
		}),
		req.body.password,
		err => {
			if (err) {
				console.log(err)
				return res.render(`/`)
			}
			passport.authenticate(`local`)(req, res, () => {
				res.redirect(`/secret`)
			})
		}
	)
})

// login routes
router.get(`/login`, (req, res) => res.render(`login`))

router.post(
	`/login`,
	passport.authenticate(`local`, {
		successRedirect: `/secret/`,
		failureRedirect: `/auth/login`
	})
)

//logout route
router.get(`/logout`, (req, res) => {
	req.logout()
	res.redirect(`/`)
})

module.exports = router
