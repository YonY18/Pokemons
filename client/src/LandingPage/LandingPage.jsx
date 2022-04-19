import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux' ;
import { getTypes } from '../actions';

export default function LandingPage(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes());
    },[dispatch])
    
    return(
        <div>
            <h1>Bienvenidos a LOPOKEMONE</h1>
            <Link to = '/home'>
                <button>LOPOKEMONE</button>
            </Link>
        </div>
    )
}


