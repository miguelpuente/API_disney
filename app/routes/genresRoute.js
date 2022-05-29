const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const GenreController = require('../controllers/GenreController');
const { validateCharacter } = require('../validators/CharacterValidator');

router.get('/',[ validarJWT ], GenreController.all );

router.get('/:id',[ validarJWT ], GenreController.show );

router.post('/', [ validarJWT ], GenreController.create );

router.put('/:id', [ validarJWT ], GenreController.edit );

router.delete('/:id',[ validarJWT ], GenreController.delete_ );

module.exports = router;