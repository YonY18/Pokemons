import React from "react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPokemons, getTypes, filterPokemonsByType} from '../../actions';
import {Link} from 'react-router-dom'
import Card from '../Card/Card';
import Paginado from '../Paginado'

export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state)=> state.pokemons)
    const types = useSelector ((state)=> state.types)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indixOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indixOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indixOfLastPokemon)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    

    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
    },[dispatch])



    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterByType(e){
        dispatch(filterPokemonsByType(e.target.value));
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
                <select onChange={e => handleFilterByType(e)}>
                    <option value="All">all types</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
            </div>

            <Paginado
                pokemonsPerPage = {pokemonsPerPage}
                allPokemons = {allPokemons.length}
                paginado = {paginado}
            />
            <div>
            {currentPokemons?.map((el) =>{
                return(
                    <Fragment key={el.id}>
                        <Link to={"/home/" + el.name}>
                            <Card name={el.name} types={el.types} image={el.img} weight={el.weight} height={el.height} />
                        </Link>
                    </Fragment>
                    )
                }) 
            }
            </div>

        </div>
    )
}