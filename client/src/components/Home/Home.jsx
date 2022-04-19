import React, {useState, useEffect} from 'react' ;
import { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons, filterPokemonsByType, orderByNameOrStrengh, filterCreated } from '../../actions';
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

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByNameOrStrengh(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterByType(e){
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1)
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
                <select onChange={e => handleSort(e)}>

                    <option value="normal">Normal</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="HAttack">Highest Attack</option>
                    <option value="LAttack">Lowest Attack</option>
                </select>

                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="created">Created</option>
                    <option value="api">Existentes</option>
                </select>

                <select onChange={e => handleFilterByType(e)}>
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
                    <Fragment key={el.name}>
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