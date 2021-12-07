const Express = require('express')

const controller = require('./kpr.controller')
const validator = require('./kpr.validation')
const router = new Express.Router()

router.get('/', validator.findAll, controller.findAll);
router.get('/:id', controller.findOne);
router.get('/recommendation/calculator', controller.recommendation);

router.post('/', validator.create, controller.create);

router.put('/:id', validator.update, controller.update);

router.delete('/:id', controller.destroy);

module.exports = router
