
const initialState = {
    pokemons : [],
    allPokemons : [],
    types : [],
    names: [],
    details: {},
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }
/////////////////////////////jonathan/////////////////////////////////////////
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,
            }
/////////////////////////////jonathan/////////////////////////////////////////
        case "GET_NAME_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
            }
/////////////////////////////jonathan/////////////////////////////////////////
        case "POST_POKEMONS":
            return{
                ...state,
            }
/////////////////////////////jonathan/////////////////////////////////////////
        case "GET_ID":
            return {
                ...state,
                details: action.payload
            }
/////////////////////////////jonathan/////////////////////////////////////////
        case 'ORDER_BY_NAME':
            let orderArray = action.payload === "asc" ? state.allPokemons.sort(function(a,b){
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                    return 0; 
                }) :
            state.allPokemons.sort(function(a,b){
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                    return 0;
                });
                return {...state, allPokemons: orderArray}
 /////////////////////////////jonathan/////////////////////////////////////////              
        case "FILTER_IF_CREATED": 
        const allPokemonsArray = state.pokemons;
        const filterOrigin = action.payload === 'createdInDb' ? allPokemonsArray.filter(pokemons => pokemons.createdInDb) : 
                allPokemonsArray.filter(pokemons=> !pokemons.createdInDb)
        return {
            ...state, 
            allPokemons: action.payload === 'All' ? allPokemonsArray : filterOrigin
        }  
/////////////////////////////jonathan/////////////////////////////////////////
        case "FILTER_BY_TYPE":
            const filtered = action.payload === 'all'? state.allPokemons : state.allPokemons.filter(el => el.types[0].name === action.payload) 
                return{         
                    ...state,
                    pokemons: filtered,
                }  
/////////////////////////////jonathan/////////////////////////////////////////    
        case "ORDER_BY_ATTACK": 
        let orderAttackArray = state.allPokemons;
        action.payload === 'ascendent' ? state.allPokemons.sort(function(a,b){
            if(a.attack > b.attack) return 1;
            if(b.attack > a.attack) return -1;
            return 0;
        }) :
        state.allPokemons.sort(function(a,b){
            if(a.attack > b.attack) return -1;
            if(b.attack > a.attack) return 1;
            return 0;
        });
        return {...state, allPokemons: orderAttackArray}
/////////////////////////////jonathan/////////////////////////////////////////
        case "FILTER_BY_NAME":{
            const fil = action.payload === ''?  state.allPokemons : 
            state.allPokemons.filter(el => el.name.includes(action.payload)? el.name : el.name === action.payload) 
                return{         
                    ...state,
                    pokemons: fil,
                }
            }
/////////////////////////////jonathan/////////////////////////////////////////
            case "CLEAN_TYPES": 
                return{
                    ...state,
                    types: []
                    }
/////////////////////////////jonathan/////////////////////////////////////////
            case "CLEAN_ID":
                return {
                    ...state,
                    details: action.payload
                    }
/////////////////////////////jonathan/////////////////////////////////////////
            default: 
            return state    
    }
}



export default rootReducer;