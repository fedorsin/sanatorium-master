const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')

// ------- Проверка на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //
const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)
router.post('/delete' , basketController.deleteBasket)


module.exports = router