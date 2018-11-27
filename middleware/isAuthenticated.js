module.exports = (req, res, next) => (!req.user ? res.redirect(`/`) : next())
// checks if there's an user in session