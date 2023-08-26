module.exports = (req, res, next) => {
    if (req.isAuthenticated())
        return next()

    // HTTP handle
    if (typeof res.sendStatus === "function")
        return res.sendStatus(401)

    // Socket Handle
    const error = new Error('Not Authorized')
    error.data = { status: 401 }
    next(error)
}
