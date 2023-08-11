const { Router } = require('express')

const userService = require('../controllers/userController')

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        const result = await userService.create(req.body)
        if (result.error) return res.status(406).json(result.error)
        else res.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

router.patch('/', (req, res, next) => {
    try {
        const result = userService.update(req.user.id, req.body)

        if (result.error) return next(result.error)
        else res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router
