
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
        case "POST_POKEMON":
            return{
                ...state
            }
/////////////////////////////jonathan/////////////////////////////////////////
        case "GET_ID":
            return {
                ...state,
                details: action.payload
            }
/////////////////////////////jonathan/////////////////////////////////////////
        case 'ORDER_BY_NAME':
            let orderArray = action.payload === "asc" ? 
            state.allPokemons.sort(function(a,b){
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                    return 0; 
                }) :
            state.allPokemons.sort(function(a,b){
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                    return 0;
                });


                return {...state, 
                    allPokemons: orderArray
                }
 /////////////////////////////jonathan/////////////////////////////////////////              
        case "FILTER_IF_CREATED": 
        const filtrado = action.payload === 'createdInDb'? 
        state.allPokemons.filter(el => typeof el.id !== 'number') : 
        state.allPokemons.filter(el=> typeof el.id === 'number') ;
        

        
        return {
            ...state,
            pokemons: action.payload === 'All'? state.allPokemons : filtrado
        }
/////////////////////////////jonathan/////////////////////////////////////////
        case "FILTER_BY_TYPE":
          /*  const filtered = action.payload === 'all'? 
            state.allPokemons : 
            state.allPokemons.filter(el =>console.log(el.types) ) */
            const error = [{
                id:1,
                error: 'No hay Pokemons',
            }]
            const filter = action.payload === 'all'? 
            state.allPokemons : state.allPokemons.filter(c => {
                let pokemon = c.types.map(el => el.name.toLowerCase());
                return pokemon.includes(action.payload.toLowerCase()) ? c : null
            })
            const verific = filter.length>0? filter : error
           // console.log(filtered)
            return{         
                    ...state,
                    pokemons: verific
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
            const errorName = [{
                id:1,
                error: 'No hay Pokemons',
            }]
            const fil = action.payload === ''?  state.allPokemons : 
            state.allPokemons.filter(el => el.name.includes(action.payload)? el.name : el.name === action.payload)
            const verifi = fil.length>0? fil : errorName
                return{         
                    ...state,
                    pokemons: verifi,
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
            case "DELETE_POKEMON":
                return{
                    ...state
                    }
/////////////////////////////jonathan/////////////////////////////////////////
            default: 
            return state    
    }
}



export default rootReducer;