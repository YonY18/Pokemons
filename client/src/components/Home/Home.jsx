/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react' ;
import { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons, orderByName, filterIfCreated, orderByAttack, filterByType } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Paginado from '../Paginado'
import SearchBar from '../SearchBar';

export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state)=> state.pokemons)
  
    
    const [order, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indixOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indixOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indixOfLastPokemon)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getPokemons());
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleOrder(e) { 
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        
    }
    function handleAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        
    }
    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterIfCreated(e.target.value));
        setCurrentPage(1);
    }
    function handleFilterType(e) { 
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
    }





    return (
        <>
        
        {allPokemons.length?
        
            <div>
                
            <Link to= '/create' >Crear Pokemone</Link>
            <h1>Los Pokemone</h1>
            <button onClick={e=> {handleClick(e)}}> 
                Recargar
            </button>
            <div>
                    <select onChange={e => handleOrder(e)} >
                        <option value='alpha'>A - Z</option>
                        <option value='asc'>Ascendant</option>
                        <option value='desc'>Descendant</option>
                    </select>
                    <select onChange={e => handleAttack(e)}>
                        <option value='oa'>Attack Order</option>
                        <option value='ascA'>Attack Desc</option>
                        <option value='descA'>Attack Asc</option>
                    </select>
                    <select onChange={e => handleFilterCreated(e)}>
                        <option value='all'>Existents</option>
                        <option value='created'>Created</option>
                    </select>

                <select onChange={e => handleFilterType(e)}>
                        <option value='all'>All</option>
                        <option value='grass'>Grass</option>
                        <option value='poison'>Poison</option>
                        <option value='fire'>Fire</option>
                        <option value='flying'>Flying</option>
                        <option value='water'>Water</option>
                        <option value='bug'>Bug</option>
                        <option value='normal'>Normal</option>
                        <option value='electric'>Electric</option>
                        <option value='ground'>Ground</option>
                        <option value='fairy'>Fairy</option>
                        <option value='rock'>Rock</option>
                        <option value='ghost'>Ghost</option>
                        <option value='steel'>Steel</option>
                        <option value='psychic'>Psychic</option>
                        <option value='ice'>Ice</option>
                        <option value='dragon'>Dragon</option>
                        <option value='stedarkel'>Stedarkel</option>
                        <option value='shadow'>Shadow</option>
                        <option value='unknown'>Unknown</option>
                    </select>
    
                <Paginado
                pokemonsPerPage = {pokemonsPerPage}
                allPokemons = {allPokemons.length}
                paginado = {paginado}
                />
                <SearchBar/>

            {currentPokemons?.map((el) =>{
                console.log(el.types)
                return(
                    <Fragment key={el.id}>
                        <Link to={"/home/" + el.id}>
                            <Card name={el.name} types={el.types} image={el.img} attack={el.attack} id={el.id}/>
                            
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