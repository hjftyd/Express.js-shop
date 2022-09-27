const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRole');

router.get('/all', productController.allProducts);
router.get('/current/:id', productController.currentProduct);
router.get('/category', productController.categoryProduct);
router.post('/new', checkRole('ADMIN'), productController.newProduct);
router.patch('/modify/:id', checkRole('ADMIN'), productController.modifyProduct);
router.delete('/delete/:id', checkRole('ADMIN'), productController.deleteProduct);

module.exports = router;
