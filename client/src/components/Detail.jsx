/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getIds, deletePokemon } from '../actions/index';
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

    function handleDelete(){
        let isDelete =  window.confirm('Estas seguro?')
        isDelete && dispatch(deletePokemon(id)) 
    }


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
                                <label>Life Points: </label>
                                {stats.hp}
                            </div>
                            <div>
                                <label>Attack: </label>
                                {stats.attack}
                            </div>
                            <div>
                                <label>Defense: </label>
                                {stats.defense}
                            </div>
                            <div>
                                <label>Speed: </label>
                                {stats.speed}
                            </div>
                            <div>
                                <label>Height: </label>
                                {stats.height / 10}m
                            </div>
                            <div>
                                <label>Weight: </label>
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
                            {
                                <button className="delete" onClick={handleDelete}>Delete Pokemon</button>
                            }    
                        </div>
                    </div>
                    </div>}
            </div>

        </div>
    )
}