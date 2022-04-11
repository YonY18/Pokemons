const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js'
const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function pokemonsApi(){
    try{
    let PokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
    let pokemones = PokemonsApi.data.results
    pokemones = await Promise.all(pokemones.map (async (pokemon) =>{
        let dataPokemon = await axios.get(`${pokemon.url}`);
        let imgPokemon = dataPokemon.data.sprites.other['dream_world'].front_default
        return {
            id: pokemon.url.split('/')[6],
            name : pokemon.name,
            hp : dataPokemon.data.stats[0].base_stat,
            attack : dataPokemon.data.stats[1].base_stat,
            defense :dataPokemon.data.stats[2].base_stat,
            speed :dataPokemon.data.stats[5].base_stat,
            height :dataPokemon.data.height,
            weight :dataPokemon.data.weight,
            img : imgPokemon,
            type :dataPokemon.data.types.map(type => type.type.name),
        }
    })
    )
    return pokemones;
    }catch(e){
        console.error(e);
    }
}
function objectPokemon(pokemon){
    return {
            id: pokemon.data.id,
            name : pokemon.data.name,
            hp : pokemon.data.stats[0].base_stat,
            attack : pokemon.data.stats[1].base_stat,
            defense :pokemon.data.stats[2].base_stat,
            speed : pokemon.data.stats[5].base_stat,
            height :pokemon.data.height,
            weight :pokemon.data.weight,
            img : pokemon.data.sprites.other['dream_world'].front_default,
            type : pokemon.data.types.map(type => type.type.name),
            }
}


/*************************************************************/


router.get('/pokemons', async (req, res)=>{
    const { name } = req.query;
    
    if(name){
      
    try{
        let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        let pokemonBd = await Pokemon.findAll({where:{name: name.toLowerCase()},include: {
            model: Type,
           }})
        if(pokemon.data && pokemonBd.length > 0) return res.json([objectPokemon(pokemon)].concat(pokemonBd))
        if(pokemonBd.length > 0) return res.json(pokemonBd);
        if(pokemon.data) return res.json([objectPokemon(pokemon)]);
    }catch(e){
        let pokemonBd = await Pokemon.findAll({where:{name: name.toLowerCase()},include: {
            model: Type,
           }})
           if(pokemonBd.length > 0)return res.json(pokemonBd);
           else return res.send('nombre no encontrado');
    }
        
    }else{
        let pokemones =  await pokemonsApi();
        pokemones = pokemones.concat( await Pokemon.findAll({include: {
            model: Type,
           }}));
        res.json(pokemones);   
    }
  
})

router.get('/types', async(req,res) =>{

    try{
    let types = await Type.findAll();
    if(types.length > 0) return res.json(types);
    let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    typesApi = await Promise.all(typesApi.data.results.map(async (type) => {
         let tipe = await Type.create({name:type.name})
         return tipe;
    }));
    console.log(typesApi);
    return res.json(typesApi);
    }catch(e){
        return res.status(400).json('Algo Salio Mal!');
    }
})

router.get('/pokemons/:id', async(req, res) =>{
    const { id } = req.params;
    try{
    if(id){
        let idInt = Number(id);
        if(Number.isInteger(idInt)){
            let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            if(pokemon.data) return res.json(objectPokemon(pokemon));
        }else{
            let pokemon = await Pokemon.findByPk(id,{include: {
                model: Type,
               }})
            if(pokemon) return res.json(pokemon)
        }
       
        return res.status(404).json('EL ID INGRESADO NO COINCIDE CON NINGUN POKEMON')
    }
    }catch(e){
         return res.status(400).json('Algo Salio Mal!');
    }
})

router.post('/pokemons', async (req, res) =>{
    let {name, vida, fuerza, defensa, velocidad, altura, peso, img, types} = req.body
    if(!img) img = 'https://cdn-icons-png.flaticon.com/512/634/634741.png'
    console.log(req.body);
    try{
    if(name&&vida&&fuerza&&defensa&&velocidad&&altura&&peso&&img&&types){
        if(Array.isArray(types)){
            var type = await Promise.all(types.map(async types => await Type.findAll({where:{name: types}})))
            type = type.flat();
        }else{
            var [type, creada] = await Type.findOrCreate({where:{name: types}})
        }
        let pokemon = await Pokemon.create({
            name: name.toLowerCase(), 
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img,

        })
        await pokemon.setTypes(type);
        return res.json(pokemon);
    }
    }catch(e){
        return res.status(400).json('Algo Salio Mal!');
    }
    
})

module.exports = router;