const Router = require('express')
const router = new Router
const cartController = require('../controllers/cartController')
const checkAuth = require('../middleware/checkAuth')


router.get('/:id', checkAuth, cartController.getUserCart)
router.post('/addToCart', cartController.addItemToCart)
router.delete('/empty/:id', cartController.emptyCart)

module.exports = router
