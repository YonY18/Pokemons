/* eslint-disable no-unused-vars */
import React from 'react' ;
import { useSelector } from 'react-redux' ;

export default function Error(){

    const errorTrue = useSelector(state=> state.pokemons)

    return(
        <div>
            {
                errorTrue?.map(e=>{
                    return(
                    <div key={e.error}><p>{e.error}</p></div>
                )})
            }
        </div>
    )
}


