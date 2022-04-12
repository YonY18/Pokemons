const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require ('../db.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
    const apiUrl = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');
    const apiInfo = await apiUrl.data.map(el =>{
        return {
            id: el.id,
            name: el.name,
            img: el.img,
            height: `${el.height / 10} m`,
            weight: `${el.weight / 10} kg`,
            health: el.stats[0].base_stat,
            attack: el.stats[1].base_stat,
            defense: el.stats[2].base_stat,
            speed: el.stats[5].base_stat,
            category: dataSpecies[index].genera[7].genus,
            ability: el.abilities[0].ability.name,
            types: el.types.map((t) => t.type.name),
            fromDb: false,
          };
    });
    return apiInfo;
};
const getDbInfo = async () =>{
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: { 
                attributes: [],
            },
        }
    })
};
const getAllPokemons = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

router.get('/pokemons', async (req,res) =>{
    const name = req.query.name
    let pokemonsTotal = await getAllPokemons();
    if (name){
        let pokemonName = await pokemonsTotal.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()))
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send('No esta el Pokemon, Sorry dude');
    }else{
        res.status(200).send(pokemonsTotal);
    }
})



module.exports = router;