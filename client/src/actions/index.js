import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons",{

        });
        return dispatch({
            type:"GET_POKEMONS",
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        var info = await axios.get("http://localhost:3001/types",{

        })

        return dispatch({ 
            type:"GET_TYPES",
            payload: info.data
        })
    }
}

export function filterPokemonsByType(payload){
    return {
        type: "FILTER_BY_TYPES",
        payload
    }
}

export function orderByNameOrStrengh(payload){
    
    return {
        type:"ORDER_BY_NAME_OR_STRENGH",
        payload
    }
}