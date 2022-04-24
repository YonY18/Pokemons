/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react' ;
import { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons, orderByName, filterIfCreated, orderByAttack, filterByType} from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Paginado from '../Paginado'
import Loading from '../Loading';
import style from '../../Estilos/Home.module.css';
import NavBar from '../NavBar';


export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state)=> state.pokemons)
    const allTypes = useSelector((state)=> state.types)
    
    const [order, setOrder] = useState('') 
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
        dispatch(getPokemons())
    }
    function handleOrder(e) { 
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(`ordered ${e.target.value}`)
    }
    function handleAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setOrder(`ordered ${e.target.value}`)
    }
    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterIfCreated(e.target.value))
    }
    function handleFilterType(e) { 
        e.preventDefault()
        dispatch(filterByType(e.target.value))
    }



    return (
        <>
            <div className={style.home}>     
            <h1>Los Pokemone</h1>
            <button onClick={e=> {handleClick(e)}}> 
                Recargar
            </button>
            <NavBar 
                allTypes={allTypes}
                handleOrder={handleOrder}
                handleAttack={handleAttack}
                handleFilterCreated={handleFilterCreated}
                handleFilterType={handleFilterType}
            />
            {allPokemons.length?
            <div>
                <Paginado
                pokemonsPerPage = {pokemonsPerPage}
                allPokemons = {allPokemons.length}
                paginado = {paginado}
                />
        
            <div className={style.cards}>
            {currentPokemons?.map((el) =>{
                console.log(el.types)
                return(
                    <Fragment key={el.id}>
                        <Link to={"/" + el.id}>
                            <Card name={el.name} types={el.types} image={el.img} attack={el.attack} id={el.id}/>
         
                        </Link>
                    </Fragment>
                    )
                }) 
            }
            </div>
            </div>:<Loading/>
        }
         </div>
        </>
    )
}