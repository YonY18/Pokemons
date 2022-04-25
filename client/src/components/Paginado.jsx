import React from "react";
import estilos from '../Estilos/Paginado.module.css'

export default function Paginado({pokemonsPerPage, allPokemons,paginado}){
   const pageNumbers = []
   
   for ( let i=0; i<=Math.ceil(allPokemons/pokemonsPerPage - 1); i++){
       pageNumbers.push(i+1)
   }
   return(
       <nav className={estilos.navbar}>
        <ul>
        {pageNumbers && 
        pageNumbers.map( number => (
            <li key={number}>
                <button className={estilos.button} onClick={() => paginado(number)}>{number}</button>
            </li>
            ))}
        </ul>
       </nav>
   )
}