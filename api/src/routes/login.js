const { Router } = require('express')

const passport = require('../../config/passport')

const router = Router()

router.post('/', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err
        if (!user) return res.json({ message: "User not exist" })

        req.logIn(user, err => {
            if (err) throw err
            res.status(201).json({
                id: user.id,
                username: user.username
            })
        })

    })(req)
})

/* 
 * All other verbs logs the user out.
 */
router.use((req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err)
        res.json({})
    })
})

module.exports = router
