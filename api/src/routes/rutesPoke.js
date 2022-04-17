const {Router} = require ('express');
const router = Router();
const {getPokeApi, getIds, postPokemons} = require('../logic/index')

/////////////////////////////jonathan/////////////////////////////////////////

router.get('/', getPokeApi);

router.get('/:id', getIds);

router.post('/', postPokemons);

/////////////////////////////jonathan/////////////////////////////////////////


module.exports = router