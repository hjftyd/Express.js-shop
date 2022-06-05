const Router = require('express')
const router = new Router
const adminController = require('../controllers/adminController')
const checkRole = require('../middleware/checkRole')

router.post('/login', adminController.login)
router.post('/addAdmin', adminController.addAdmin)
router.patch('/userModify/:id', checkRole('ADMIN'), adminController.userModify)
router.delete('/delete/:id', checkRole('ADMIN'), adminController.delete)
router.get('/userId/:id', checkRole('ADMIN'), adminController.userId)
router.get('/users', checkRole('ADMIN'), adminController.users)

module.exports = router
