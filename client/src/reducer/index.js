
const initialState = {
    pokemons : [],
    allPokemons : [],
    types : [],
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_POKEMONS":
            //console.log(action.payload)
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }
        case "GET_TYPES":
            //console.log(action.payload)
            return {
                ...state,
                types: action.payload,
            }
        case "GET_NAME_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
            }
        case "POST_POKEMONS":
            return{
                ...state,
            }
        case "GET_ID":
            return {
                ...state,
                details: action.payload
            }

            case "ORDER_BY_NAME": {
                let sortedPokemons = action.payload === 'asc'?
                    state.pokemons.sort(function (a,b){
                        if (a.name > b.name){
                            return 1
                        } else if (b.name > a.name) {
                            return -1
                        }
                        return 0;
                        
                    }) : state.pokemons.sort(function (a,b){
                        if(a.name > b.name){
                            return -1
                        } else if (b.name > a.name){
                            return 1
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        pokemons: sortedPokemons
                    }
            }   
            case "FILTER_IF_CREATED": {
                const filtrado = action.payload === 'created'? state.allPokemons.filter(el => typeof el.id !== 'number') : state.allPokemons.filter(el=> typeof el.id === 'number') ;
                return {
                    ...state,
                    pokemons: action.payload === 'all'? state.allPokemons : filtrado
                }
            }

            case "FILTER_BY_TYPE":{
                const filtered = action.payload === 'all'? state.allPokemons : state.allPokemons.filter(el => el.types[0].name === action.payload) 
                // console.log(state.allPokemons)
                return{         
                    ...state,
                    pokemons: filtered,
                }
            }





                        



                    

            default: 
            return state    
    }
}



export default rootReducer;