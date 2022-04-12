const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require ('../db.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async()=>{
    const firstApiPage = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
    const secondApiPage = await axios.get(firstApiPage.data.next);     
    const allPokemons = firstApiPage.data.results.concat(secondApiPage.data.results);
        
    const PokemonProps = await Promise.all(
        allPokemons.map(async ele=>{
            const pokemon = await axios.get(ele.url);
            return{
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: `${pokemon.data.height / 10} m`,
                weight: `${pokemon.data.weight / 10} kg`,
                type: pokemon.data.types && pokemon.data.types.map((t)=> t.type.name),
                img: pokemon.data.sprites.other.home.front_default       

            }
        }) 
    ) 
    return PokemonProps;
};
const getDbInfo = async () =>{
    const dbPokemons = await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: { 
                attributes: [],
            },
        }
    })
 return dbPokemons
};

const getTypeInfo = async () =>{
    return await Type.findAll()
}

const getAllPokemons = async () =>{
    /*const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;*/
    const [apiInfo, dbInfo] = await Promise.all([getApiInfo(), getDbInfo()]); 
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;

};

const getTypesApi = async () =>{
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
    const typesArray = await typesApi.data.results;
        typesArray.forEach(e => {
            Type.findOrCreate({
                where: {
                    name: e.name,
                }
            })
        })
        return typesArray
}

/*let pokety = await Pokemon.findAll();
let filtroType = await pokety.filter(e=> e.name === name);
let idTyp = filtroType.id;

let pokemonId = name;
let typeId= idTyp;

await pokemontype.create({
   pokemonId,
   typeId,
})*/

/********************************* Pokemon GET POST ********************************/
router.get('/pokemons', async (req,res) =>{
    const {name} = req.query; 
    const totalPokemons = await getAllPokemons();
    if (name){
        const pokemonName = totalPokemons.filter(ele=>ele.name.toLowerCase().includes(name.toLowerCase()))
        if(pokemonName.length){
            return res.status(200).send(pokemonName);
        } return res.send({error: 'Pokemon not found'})
    } else {
        try{
            return res.status(200).send(totalPokemons);
        } catch(error){
            res.send(error)
        }
        
    }
});

router.get('/pokemons/:id', async (req, res) => {
    const {id} = req.params;
    const totalPokemons = await getAllPokemons();
    if(id){
        const pokemonId = await totalPokemons.filter(pokeId => pokeId.id == id);
        if(pokemonId.length){
            try{
                return res.status(200).send(pokemonId)
            } catch(error){
                res.send(error)
            }
        }
    }
});

router.post('/pokemons', async (req,res) => {
    let {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDb,
        type,
    } = req.body;
    let pokemonCreated = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDb,
    });
    let typeDb = await Type.findAll({
        where: { name : name } 
    });
    pokemonCreated.addType(typeDb)
    res.send('Personaje Creado Correctamente')
})

/********************************* Type GET ********************************/
router.get('/type', async (req,res) =>{
    let base = await getTypeInfo();
    if(base.length === 0){
        base = await getTypesApi();
      console.log (base)
        res.send(base);
    }else{
        res.send(base);
    }
});

module.exports = router;