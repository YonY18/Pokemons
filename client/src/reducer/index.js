
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
            return {
                ...state,
                types: action.payload,
            }

            /*  case "FILTER_BY_TYPES":
                const allPokemons = state.allPokemons
                const statusFiltered = action.payload === "All" ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload))
                console.log(statusFiltered)
                return {
                        ...state,
                        pokemons: statusFiltered.length ? statusFiltered : [`${action.payload} Pokemons`]
                    }*/
                    
                    case "FILTER_BY_TYPES":
                            /* const genreFilter = state.allPokemons.filter((g) =>
                          g.types.includes(action.payload)
                             );
                            console.log(genreFilter);
                            return {
                                ...state,
                                pokemons: action.payload === "All" ? state.allPokemons : genreFilter,
                                 };*/
                                 const allFilter = state.allPokemons
                                 const filter = allFilter.filter(c => {
                                    let countryAct = c.types.map(el => el.name);
                                    console.log(countryAct)
                                    return countryAct.includes(action.payload) ? c : null
                                    })
                                    
                                    return {
                                    ...state,
                                    pokemons: action.payload === "All" ? state.allPokemons : filter,
                                     };


                    case "ORDER_BY_NAME_OR_STRENGH":
                        let sortedArray
                
                        if(action.payload === 'asc'){
                                sortedArray = state.pokemons.sort(function (a, b){
                                    if(a.name > b.name){
                                        return 1;
                                    }
                                    if(b.name > a.name){
                                        return -1;
                                    }
                                        return 0;
                                    }) 
                        }
                        if(action.payload === 'desc'){
                                sortedArray = state.pokemons.sort(function (a, b){
                                    if(a.name > b.name){
                                        return -1;
                                    }
                                    if(b.name > a.name){
                                        return 1;
                                    }
                                    return 0;
                                    }) 
                            }
                        if(action.payload === 'HAttack'){
                                sortedArray = state.pokemons.sort(function (a, b){
                                    if(a.attack > b.attack){
                                        return -1;
                                    }
                                    if(b.attack > a.attack){
                                        return 1;
                                    }
                                    return 0;
                                    }) 
                            }
                        if(action.payload === 'LAttack'){
                                sortedArray = state.pokemons.sort(function (a, b){
                                    if(a.attack > b.attack){
                                        return 1;
                                    }
                                    if(b.attack > a.attack){
                                        return -1;
                                    }
                                    return 0;
                                    }) 
                            }  
                        if(action.payload === 'normal'){
                            const apiPokes = state.pokemons.filter( el => !el.createdInDb).sort(function (a, b){
                                    if(a.id > b.id){
                                        return 1;
                                    }
                                    if(b.id > a.id){
                                        return -1;
                                    }
                                    return 0;
                                    }) 
                            const dbPokes = state.pokemons.filter( el => el.createdInDb).sort(function (a, b){
                                    if(a.id > b.id){
                                        return 1;
                                    }
                                    if(b.id > a.id){
                                        return -1;
                                    }
                                    return 0;
                                })
                                sortedArray = [...apiPokes, ...dbPokes]
                            }  
                            return {
                                ...state,
                                pokemons: sortedArray
                            }
            default: 
            return state    
    }
}



export default rootReducer;