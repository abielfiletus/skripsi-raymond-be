const Express = require('express')

const controller = require('./user.controller')
const validator = require('./user.validation')
const router = new Express.Router()

router.get('/', validator.findAll, controller.findAll);
router.get('/:id', controller.findOne);

router.post('/', validator.create, controller.create);

router.put('/:id', validator.update, controller.update);
router.put('/change-password/:id', validator.changePassword, controller.changePassword);

router.delete('/:id', controller.destroy);

module.exports = router
