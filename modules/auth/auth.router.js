const Express = require('express')

const controller = require('./auth.controller')
const validator = require('./auth.validation')
const router = new Express.Router()

router.post('/login', validator.login, controller.login);
router.post('/register', validator.register, controller.register);

module.exports = router
