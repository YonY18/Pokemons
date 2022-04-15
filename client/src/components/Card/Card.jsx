import React from 'react';

export default function Card({ name, types, image, id, weight, height}){

    return(
        <div>
             <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            {
                <img src={image} alt="Img not found" height="190px"/>
            }
            <span >Types</span>
            <div>
                <span>{types}</span>
            </div>
            <span>About</span>
            <div>
                <div>
                    <div>
                        <span>{weight / 10}kg</span>
                    </div>
                    <span>Weight</span>
                </div>
                <div>
                    <div>
                        <span>{height / 10}m</span>
                    </div>
                    <span>Height</span>    
                </div>
            </div>
            
        </div>
    )
}
