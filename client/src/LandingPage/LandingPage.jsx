import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux' ;
import { getTypes } from '../actions';
import estilos from '../Estilos/LandingPage.module.css'

export default function LandingPage(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes());
    },[dispatch])
    
    return(
        <div className={estilos.LandingPage}>
            <h1 className={estilos.titulo}>Let's go Pokemons</h1>
            <div className={estilos.link}><Link to = '/home'>
                <button className={estilos.button}>Let's go</button>
            </Link></div>
        </div>
    )
}


