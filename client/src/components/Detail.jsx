/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getIds } from '../actions/index';
import { Link } from "react-router-dom";
import Loading from "./Loading";
import estilos from '../Estilos/Detail.module.css'


export default function Details() {

    const dispatch = useDispatch();
    const [stats, setStats] = useState({});
    const details = useSelector(store => store.details);
    const { id } = useParams();

    const getDetails = () => {
        if (Object.keys(stats).length === 0) dispatch(getIds(id))
    }

    useEffect(() => {
        getDetails();
    
    },[])

    useEffect(() => {
        setStats(details);
    }, [details])




    return (
        <div>
            <Link to= '/home'>
                <button className={estilos.button}>Home</button>
            </Link>
            <div key={stats.id} >
                {Object.keys(stats).length === 0 ? <Loading/> :
                <div className={estilos.todo}>
                
               
                   
                            
                    <h1 className={estilos.titulo}>{stats.name}</h1>
                
                     
                    <div className={estilos.contGral}>
                        
                        
                            <img src={stats.img} alt='detailsPicture' />
                       
                        <div className={estilos.contenedorInfo}> 
                            <div>
                                <label>Puntos de Salud: </label>
                                {stats.hp}
                            </div>
                            <div>
                                <label>Puntos de Ataque: </label>
                                {stats.attack}
                            </div>
                            <div>
                                <label>Puntos de Defensa: </label>
                                {stats.defense}
                            </div>
                            <div>
                                <label>Puntos de Velocidad: </label>
                                {stats.speed}
                            </div>
                            <div>
                                <label>Puntos de Peso: </label>
                                {stats.height / 10}m
                            </div>
                            <div>
                                <label>Puntos de Altura: </label>
                                {stats.weight / 10}kg
                            </div>
                            <div>
                                <label>Id: </label>
                                {stats.id}
                            </div>
                            <div >
                            {stats.types?.map((el, i) =>
                                <p key={i}>{el.name}</p>
                            )}
                            </div>
                        </div>
                    </div>
                    </div>}
            </div>

        </div>
    )
}