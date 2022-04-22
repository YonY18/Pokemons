import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux' ;
import { getTypes } from '../actions';
import styles from '../Estilos/LandingPage.module.css'

export default function LandingPage(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes());
    },[dispatch])
    
    return(
        <div>
            <h1 className={styles.titulo}>Let's go Pokemons</h1>
            <Link to = '/home'>
                <button className={styles.button}>Let's go</button>
            </Link>
        </div>
    )
}


