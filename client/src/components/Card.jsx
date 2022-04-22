import React from "react";
import {Link} from 'react-router-dom'
import style from '../Estilos/Card.module.css'

export default function Card({id, name, image, types, attack}) {

    return (
        <div style={style.card}>
            <h3>{name}</h3>
            <img src={image} alt="Img not found" height="190px"/>
            <h5>{types?.map(e=> <div key={e.name}>{e.name}</div> )}</h5>
            <h5>Ataque:{attack}pts</h5>
            {console.log(types)}
        </div>
    )
}