
const Router = require('express')
const router = new Router()
const sanatorRouter = require('./sanatorRouter')
const userRouter = require('./userRouter')
const cityRouter = require('./cityRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRoutes')
const orderRouter = require('./orderRouter')
const legalRouter = require('./legalRouter')


router.use('/user', userRouter);
router.use('/type', typeRouter)
router.use('/city', cityRouter)
router.use('/sanator', sanatorRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/legal', legalRouter)


module.exports = router
