const Router = require('express')
const router = new Router()
const sanatorController = require('../controllers/sanatorController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), sanatorController.create)
router.post('/update',checkRole('ADMIN'), sanatorController.setDescription)
router.get('/', sanatorController.getAll)
router.get('/:id', sanatorController.getOne)
router.post('/update/:id',checkRole('ADMIN'), sanatorController.updated)
router.post('/del/:id',checkRole('ADMIN'), sanatorController.delOne)

module.exports = router