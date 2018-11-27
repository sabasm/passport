const isAuthenticated = require(`../middleware/isAuthenticated`),
	express = require(`express`)
router = express.Router()

// index route
router.get(`/`, (req, res) => res.render(`index`))

// secret route - with isAuthenticated middleware
router.get(`/secret`, isAuthenticated, (req, res) => res.render(`secret`))

module.exports = router
