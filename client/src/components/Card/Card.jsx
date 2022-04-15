import React from 'react';


export default function Card({ name, types, image, id, weight, height}){

    let sprite;
    if(id >= 1 && id <= 100){
        sprite = true
    }
    return(
        <div>
             <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            {
                sprite ?
               <img src={`images/sprites/${id}.gif`} alt="Img not found" height="190px"/>
                :
                <img src={image} alt="Img not found" height="190px"/>
            }
            <span >Types</span>
            <div>
                {
                    types ? types.map( el => {
                        return(
                            <img src={`images/types/${el}.png`} alt="Types" height="80px" key={el}/>
                        )
                     }
                    ) :
                    <span>Types not found</span>
                }
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
