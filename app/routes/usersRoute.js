const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const UserController = require('../controllers/UserController');

router.get('/', UserController.all )

module.exports = router;