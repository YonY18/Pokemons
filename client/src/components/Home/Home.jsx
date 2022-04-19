import React, {useState, useEffect} from 'react' ;
import { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons, getTypes, filterPokemonsByType } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card';



export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state)=> state.pokemons)
    const types = useSelector ((state)=> state.types)
    

    

    useEffect (()=>{
        dispatch(getPokemons());
        dispatch(getTypes())
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterByType(e){
        dispatch(filterPokemonsByType(e.target.value));
    }

    return (
        <>
        
        {allPokemons.length?
        
            <div>
                
            <Link to= '/pokemons'>Crear Pokemone</Link>
            <h1>Los Pokemone</h1>
            <button onClick={e=> {handleClick(e)}}> 
                Recargar
            </button>
            <div>
                <select>

                    <option value="normal">Normal</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="HAttack">Highest Attack</option>
                    <option value="LAttack">Lowest Attack</option>
                </select>
                <select>
    
                    <option value="All">All</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
                </select>

                <select onChange={e => handleFilterByType(e)}>
                <option value="All">all types</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
    
            
            {allPokemons.map((el) =>{
                console.log(el.types)
                return(
                    <Fragment key={el.name} >
                        
                        <Link to={"/home/" + el.name}>
                            <Card name={el.name} types={el.types} image={el.img}/>
                        </Link>
                    </Fragment>
                    )
                }) 
            }

            </div>


        </div>:
        <div>Cargando...</div>
    }
        </>
    )
}