/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import { filterByName } from "../actions"
import estilos from "../Estilos/NavBar.module.css"

export default function NavBar({allTypes, handleOrder, handleAttack, handleFilterCreated, handleFilterType, handleClick }) {
    const dispatch = useDispatch()
    const allPokeTypes = useSelector ((state)=> state.allPokemons)
    const [stateName, setStateName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setStateName((e.target.value).toLowerCase());
        dispatch(filterByName((e.target.value).toLowerCase()));
    }

    return (
        <div className={estilos.contenedorFiltro}>
            <button className={estilos.button}  onClick={e => { handleClick(e) }}>
                Recargar
            </button>
            
            <div className={estilos.contenedorOrden}>
                <div className={estilos.orden}>
                    <label className={estilos.label}>Ordenar por: </label>
                    <select className={estilos.ordenSelect} onChange={e => handleOrder(e)}>
                        <option value="asc">Aa to Zz</option>
                        <option value="desc">Zz to Aa</option>
                    </select>
                    <select className={estilos.ordenSelect} defaultValue='attack' onChange={e => handleAttack(e)}>
                        <option value="attack" disabled>Ataque</option>
                        <option value="ascendent">Ataque Bajo</option>
                        <option value="descendent">Ataque Alto</option>
                    </select>
                </div>
                <div>
                <SearchBar stateName={stateName} handleChange={handleChange} />
                </div> 
                <div className={estilos.orden}>
                    <label className={estilos.label}>Aplicar filtros: </label>
                    <select className={estilos.ordenSelect} defaultValue='Origin' onChange={e => handleFilterCreated(e)}>
                        <option value="All">Creado en</option>
                        <option value="api">Api</option>
                        <option value="createdInDb">Base de Datos</option>
                    </select>

                    <select className={estilos.ordenSelect} defaultValue='Types' onChange={e => handleFilterType(e)}>
                        <option value="Types" disabled>Tipos</option>
                        <option value="all">Todos los Tipos</option>
                        
                        {allTypes && allTypes.map((e) => ( <option value={e.name} key={e.name}>{e.name}</option>))}
                    </select>
                </div>
            </div>

            <div>
                <Link to='/create'><button className={estilos.button}>Crea tu Pokemon!</button></Link>
            </div>
                           



        </div>
    )
}