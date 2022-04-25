/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react' ;
import { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons, orderByName, filterIfCreated, orderByAttack, filterByType, getTypes} from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Paginado from '../Paginado'
import Loading from '../Loading';
import estilos from '../../Estilos/Home.module.css';
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
        dispatch(getTypes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }
    function handleOrder(e) { 
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setOrder(`ordered ${e.target.value}`)
    }
    function handleAttack(e) {
        e.preventDefault()
        dispatch(orderByAttack(e.target.value));
        setOrder(`ordered ${e.target.value}`)
    }
    function handleFilterCreated(e) {
       e.preventDefault()
        dispatch(filterIfCreated(e.target.value))
    }
    function handleFilterType(e) { 
        dispatch(filterByType(e.target.value))
    }



    return (
        <>
            <div className={estilos.home}>     
            <h1 className={estilos.titulo}>Pokemons!</h1>
            <NavBar 
                allTypes={allTypes}
                handleClick={handleClick}
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
        
            <div className={estilos.cards}>
            {currentPokemons?.map((el) =>{
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
         <footer className={estilos.henry}><img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="Logo Henry" width='150'/></footer>
        </>
    )
}