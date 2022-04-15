import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPokemons, getTypes, reloadPokemons } from '../../actions';
import {Link} from 'react-router-dom'
import Card from '../Card/Card';


export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state)=> state.pokemons)




    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
    },[dispatch])



    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }



    return(
        <div>
            <Link to= '/pokemons'>Crear Pokemon</Link>
            <h1>LoPokemone</h1>
            <button  onClick={e => {handleClick(e)}}>
                Volver a cargar
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
                <select>
                    <option value="All">all types</option>
                </select>
            </div>
            <div>
            {allPokemons.map( el => {
                    return(
                        <div>
                            <Link to={"/home/" + el.id}>
                                <Card name={el.name} types={el.types} image={el.img} weight={el.weight} height={el.height} />
                            </Link>
                        </div>
                    )
                }) 
            }
            </div>

        </div>
    )
}