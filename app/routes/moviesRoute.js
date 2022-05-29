const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const MovieController = require('../controllers/MovieController');
const { validateCharacter } = require('../validators/CharacterValidator');

router.get('/',[ validarJWT ], MovieController.all );

router.get('/:id',[ validarJWT ], MovieController.show );

router.post('/', [ validarJWT ], MovieController.create );

router.put('/:id', [ validarJWT ], MovieController.edit );

router.delete('/:id',[ validarJWT ], MovieController.delete_ );

module.exports = router;