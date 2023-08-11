const { Router } = require('express')

const usersRouter = require('./users')
const loginRouter = require('./login')

const router = Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
      pid: process.pid
  })
})

router.use('/user', usersRouter)
router.use('/login', loginRouter)

module.exports = router
