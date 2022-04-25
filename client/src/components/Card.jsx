/* eslint-disable no-unused-vars */
import React from "react";
import {Link} from 'react-router-dom'
import estilos from '../Estilos/Card.module.css'

export default function Card({id, name, image, types, attack}) {

    return (
        <div className={estilos.card}>
            <h3 className={estilos.titulo}>{name}</h3>
            <img src={image} alt="Img not found" height="190px"/>
            
            <h5 className={estilos.tipos}>
            <div  className={estilos.contenedorTipos} >
                {
                         types?.map(e=> <div key={e.name}>{e.name}</div> )}
                
            </div>
           </h5>
            
            
            <div className={estilos.ataque}><span>Ataque:</span> <p className={estilos.p}>{attack} pts</p> </div>
        </div>
    )
}