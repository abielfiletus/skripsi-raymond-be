const Express = require('express')

const controller = require('./bank.controller')
const validator = require('./bank.validation')
const router = new Express.Router()

router.get('/', validator.findAll, controller.findAll);
router.get('/:id', controller.findOne);

router.post('/', validator.create, controller.create);

router.put('/:id', validator.update, controller.update);

router.delete('/:id', controller.destroy);

module.exports = router
