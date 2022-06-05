const Router = require('express')
const router = new Router
const adminController = require('../controllers/adminController')


router.post('/login', adminController.login)
router.post('/addAdmin', adminController.addAdmin)
router.patch('/userModify/:id', adminController.userModify)
router.delete('/delete/:id', adminController.delete)
router.get('/userId/:id', adminController.userId)
router.get('/users', adminController.users)


module.exports = router
