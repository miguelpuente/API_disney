const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const CharacterController = require('../controllers/CharacterController');
const { validateCharacter } = require('../validators/CharacterValidator');

router.get('/',[ validarJWT ], CharacterController.all );

router.get('/:id',[ validarJWT ], CharacterController.show );

router.post('/', [ validarJWT ], CharacterController.create );

router.put('/:id', [ validarJWT ], CharacterController.edit );

router.delete('/:id',[ validarJWT ], CharacterController.delete_ );

module.exports = router;