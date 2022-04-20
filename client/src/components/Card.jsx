import React from "react";

export default function Card({ name, image, types, attack}) {

    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt="Img not found" height="190px"/>
            <h5>{types?.map(e=> <div key={e.name}>{e.name}</div> )}</h5>
            <h5>Ataque:{attack}pts</h5>
            {console.log(types)}
        </div>
    )
}