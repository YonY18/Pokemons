import axios from 'axios';

export function getPokemons() {
    return async (dispatch) => {
        try {
            let urlPokes = await axios.get('http://localhost:3001/pokemons');
            return dispatch({
                type: 'GET_POKEMONS',
                payload: urlPokes.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function getTypes(){
    return async (dispatch) => {
        try{
            let urlTypes = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: urlTypes.data
            })
        } catch(e){
            console.log(e)
        }
    }
}
export const cleanTypes = ()=> (dispatch) => {
    dispatch({
        type: "CLEAN_TYPES"
    })
}
export function getPokemonsName(name){
    return async(dispatch) => {
        try{
            let res = await axios.get(`http://localhost:3001/pokemons/${name}`); 
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: res.data
            })
        }catch(e){
            console.log(e)
        }
    }
}
export function getIds(id){
    return async (dispatch) => {
        let urlId = await axios.get(`http://localhost:3001/pokemons/${id}`);
        dispatch({
            type: "GET_ID",
            payload: urlId
        })

    }
}

export const cleanId = () => (dispatch) => {
    let rest = {};
    dispatch({
        type: "CLEAN_ID",
        payload: rest
    })
}
export function postPokemon(payload) {
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/pokemons',payload);
        return {
            type:"POST_POKEMON",
            payload: response
        }
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    } 
}
export function orderByAttack(payload){
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }  
}
export function filterIfCreated(payload){
    // console.log(payload)
    return{
        type: "FILTER_IF_CREATED",
        payload
    } 
}
export function filterByType(payload) {
    // console.log(payload)
    return {
        type: "FILTER_BY_TYPE",
        payload
    }
}





