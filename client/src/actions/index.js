import axios from 'axios';
/////////////////////////////jonathan/////////////////////////////////////////
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
/////////////////////////////jonathan/////////////////////////////////////////
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
/////////////////////////////jonathan/////////////////////////////////////////
export const cleanTypes = ()=> (dispatch) => {
    dispatch({
        type: "CLEAN_TYPES"
    })
}
/////////////////////////////jonathan/////////////////////////////////////////
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
/////////////////////////////jonathan/////////////////////////////////////////
export function getIds(id){
    return async function (dispatch){
        try{
            let json = await axios.get("http://localhost:3001/pokemons/" + id);

            return dispatch({
                type:"GET_ID",
                payload: json.data
            }) 
        } catch(error){
            console.log(error)
        }
    }
}
/////////////////////////////jonathan/////////////////////////////////////////
export const cleanId = () => (dispatch) => {
    let rest = {};
    dispatch({
        type: "CLEAN_ID",
        payload: rest
    })
}
/////////////////////////////jonathan/////////////////////////////////////////
export function postPokemon(payload){
    return async function(dispatch){
        const pokemon = await axios.post('http://localhost:3001/pokemons', payload)
        return dispatch({
            type: 'POST_POKEMON',
            payload: pokemon
        })
    }
}
/////////////////////////////jonathan/////////////////////////////////////////
export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    } 
}
/////////////////////////////jonathan/////////////////////////////////////////
export function orderByAttack(payload){
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }  
}
/////////////////////////////jonathan/////////////////////////////////////////
export function filterIfCreated(payload){
    return{
        type: "FILTER_IF_CREATED",
        payload
    } 
}
/////////////////////////////jonathan/////////////////////////////////////////
export function filterByType(payload) {
    return {
        type: "FILTER_BY_TYPE",
        payload
    }
}
/////////////////////////////jonathan/////////////////////////////////////////
export function filterByName(payload){
    return{
        type: "FILTER_BY_NAME",
        payload
    }
}
/////////////////////////////jonathan/////////////////////////////////////////


