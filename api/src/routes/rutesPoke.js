const {Router} = require ('express');
const router = Router();
const {getPokeApi, getIds, postPokemons, deletePokemons} = require('../logic/index')

/////////////////////////////jonathan/////////////////////////////////////////

router.get('/', getPokeApi);

router.get('/:id', getIds);

router.post('/', postPokemons);

router.delete('/:id', deletePokemons);

/////////////////////////////jonathan/////////////////////////////////////////


module.exports = router