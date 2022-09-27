const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const adminRouter = require('./adminRouter');
const cartRouter = require('./cartRouter');
const deliveryRouter = require('./deliveryRouter');

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/cart', cartRouter);
router.use('/delivery', deliveryRouter);

module.exports = router;
