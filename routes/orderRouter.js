const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const checkAuth = require('../middleware/checkAuth');

router.post('/create', checkAuth, orderController.createOrder);
router.delete('/delete/:id', checkAuth, orderController.deleteOrder);

module.exports = router;
