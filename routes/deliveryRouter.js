const Router = require('express')
const router = new Router
const deliveryController = require('../controllers/deliveryController')
const checkRole = require('../middleware/checkRole')

router.get('/all', deliveryController.allDeliveries)
router.get('/current/:id', deliveryController.currentDelivery)
router.post('/new', checkRole('ADMIN'), deliveryController.newDelivery)
router.patch('/modify/:id', checkRole('ADMIN'), deliveryController.modifyDelivery)
router.delete('/delete/:id', checkRole('ADMIN'), deliveryController.deleteDelivery)

module.exports = router
