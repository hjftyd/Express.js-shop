const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const {check} = require('express-validator')
const checkAuth = require('../middleware/checkAuth')

router.post('/registration',
    [check('username', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({
            min: 4,
            max: 10
        }),], userController.registration)
router.post('/login', userController.login)
router.patch('/modify', checkAuth, userController.modify)
router.delete('/delete', checkAuth, userController.delete)
router.get('/profile', checkAuth, userController.profile)
router.put('/personal', checkAuth, userController.addInformation)


module.exports = router
  