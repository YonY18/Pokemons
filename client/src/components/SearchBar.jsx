import React from "react";
import { useState } from "react";
import { useDispatch} from 'react-redux';
import { getPokemonsName } from '../actions'

export default function SearchBar({handleKetUp, errores}) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    
    function handleSubmit(e) {
            e.preventDefault();
            if(name && name.length > 1 && errores !== {}){
                dispatch(getPokemonsName(name))
                setName('')
            }else{
                alert('completar el campo')
                setName('')
            }      
    }
    
    return (
        <div >
            <div >
            <form onSubmit={handleSubmit}>
                <input 
                    className="form__input"
                    onKeyUp={handleKetUp} 
                    name="buscar" 
                    value={name} 
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Buscar Pokemones" 
                    type="text" 
                />
                <button  type="submit">Buscar</button>
            </form>
            <small >
            {errores && (
                        <p>{errores.error}</p>
                    )}
            </small>
           
            </div>
        </div>
    )
}