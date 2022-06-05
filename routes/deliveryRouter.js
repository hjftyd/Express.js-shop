const Router = require('express')
const router = new Router
const deliveryController = require('../controllers/deliveryController')

router.get('/all', deliveryController.allDeliveries)
router.get('/current/:id', deliveryController.currentDelivery)
router.post('/new', deliveryController.newDelivery)
router.patch('/modify/:id', deliveryController.modifyDelivery)
router.delete('/delete/:id', deliveryController.deleteDelivery)

module.exports = router
