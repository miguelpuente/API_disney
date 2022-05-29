const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const MovieCharacterController = require('../controllers/MovieCharacterController');
const { validateCharacter } = require('../validators/CharacterValidator');

router.get('/',[ validarJWT ], MovieCharacterController.all );

router.get('/:id',[ validarJWT ], MovieCharacterController.show );

router.post('/', [ validarJWT ], MovieCharacterController.create );

router.put('/:id', [ validarJWT ], MovieCharacterController.edit );

router.delete('/:id',[ validarJWT ], MovieCharacterController.delete_ );

module.exports = router;