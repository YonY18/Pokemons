const initialState = {
    pokemons : [],
    allPokemons: [],
    types: [],
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,
            }

        case "FILTER_BY_TYPES":
        const allPokemons = state.allPokemons
        const statusFiltered = action.payload === "All" ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload) )
            return {
                ...state,
                pokemons: statusFiltered.length ? statusFiltered : [`${action.payload} Pokemons`]
            }

            

            default: 
            return state    
    }
}



export default rootReducer