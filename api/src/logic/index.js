const axios = require('axios');
const { Pokemon, Type } = require ('../db.js');
/////////////////////////////jonathan/////////////////////////////////////////
const getPokeApi = async (req, res) => {
    let name = req.query.name;
    try{
        if(name !== undefined && name && name !== '') {
            let pokemon = {};
            pokemon = await Pokemon.findOne({
                where: {name},
                includes: {
                    model: Type,
                    attributes: ['id', 'name']
                }
            })
            if(pokemon) res.json(pokemon);
            else {
                const urlPoke = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name);
                if(urlPoke) {
                    pokemon = {
                        id: urlPoke.data.id,
                        name: urlPoke.data.name,
                        img: urlPoke.data.sprites.other['official-artwork'].front_default,
                        hp: urlPoke.data.stats[0].base_stat,
                        attack: urlPoke.data.stats[1].base_stat,
                        defense: urlPoke.data.stats[2].base_stat,
                        speed: urlPoke.data.stats[5].base_stat,
                        height: urlPoke.data.height,
                        weight: urlPoke.data.weight,
                    }
                    let types = urlPoke.data.types.map(el => el.type.name)
                    pokemon = {...pokemon, types:types}
                   res.json(pokemon);
                }
            }
        }
        const urlApi = await axios.get('https://pokeapi.co/api/v2/pokemon'); //?limit=40
        const bd = await Pokemon.findAll({
            attributes: ['name', 'img', 'attack', 'defense', 'id'],
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                  }
            }
        });
        let details = await Promise.all(urlApi.data.results.map(async el => await axios(el.url)));
        details = details.map(el => {
            let newPokemon = {
                id: el.data.id,
                name: el.data.name,
                img: el.data.sprites.other['official-artwork'].front_default,
                attack: el.data.stats[1].base_stat,
                defense: el.data.stats[2].base_stat,
            }
            let types = el.data.types.map(el => el.type);
            types.map(el => delete el.url)
            return newPokemon = {...newPokemon, types: types};
        })
        details = details.concat(bd);
       res.json(details)
    } catch (e) {
        console.log(e)
    }
}
/////////////////////////////jonathan/////////////////////////////////////////
const getIds = async (req, res) => {
    const id = req.params.id;
    if (!id || parseInt(id) <0) res.status(404).json('Invalid Id');
    try {
        if(!id.includes('-')) {
            const urlId = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
            let pokemon = {
                id: urlId.data.id,
                name: urlId.data.name,
                img: urlId.data.sprites.other['official-artwork'].front_default,
                hp: urlId.data.stats[0].base_stat,
                attack: urlId.data.stats[1].base_stat,
                defense: urlId.data.stats[2].base_stat,
                speed: urlId.data.stats[5].base_stat,
                height: urlId.data.height,
                weight: urlId.data.weight,
            }
            let types = urlId.data.types.map(el => {
                let gemps = {}
                return gemps = {name: el.type.name}
            });
            pokemon = {...pokemon, types: types};
            res.json(pokemon);
        } else {
            const pokemon = await Pokemon.findByPk(String(id), {
                includes: {
                    model: Type,
                    attributes: ['name']
                }
            });
            if (pokemon) res.json(pokemon);
            else {
                res.stats(400).json('ID no Valida')
            }
        }
    } catch (e) {
        console.log(e)
    }
}
/////////////////////////////jonathan/////////////////////////////////////////
const getTypes = async (req,res) => {
    try{
        const bdTypes = await Type.findAll({attributes: ['name', 'id']})
       
        if(bdTypes.length === 0){
            let ress = await axios.get('https://pokeapi.co/api/v2/type');
            var types = ress.data.results.map(el => {return {name: el.name}})
            Type.bulkCreate(types);
           res.json(types);
        }
        res.json(bdTypes);
    } catch (e){
        console.log(e)
    }
}
/////////////////////////////jonathan/////////////////////////////////////////
const postPokemons = async (req,res) => {
    let {name,img,hp,attack,defense,speed,height,weight,types} = req.body;
    if(!name) res.status(404).json('Invalid Name');

    name = name.toLowerCase();
    let newPokemon = await Pokemon.create({
        name,
        img,
        hp,
        attack,
        defense,
        speed,
        height,
        weight
    });
    const typs = await Type.findAll({
        where:{ name: types}
    })
    newPokemon.addType(typs)
    res.json(newPokemon)
}
/////////////////////////////jonathan/////////////////////////////////////////
const deletePokemons = async (req, res) => {
    try{
        const {id} = req.params;
        res.json(await Pokemon.destroy({
             where: {id} 
        }))
     } catch(error){
         res.send(error)
     }
 }
/////////////////////////////jonathan/////////////////////////////////////////
module.exports = {getPokeApi, getIds, postPokemons, getTypes, deletePokemons}

