const { Router } = require('express');
const router = Router();
const AuthController = require('../controllers/AuthController');
const { validateAuth } = require('../validators/authValidator');

router.post('/login', [ validateAuth ] , AuthController.login );
router.post('/register', AuthController.register );

module.exports = router;