/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTypes, postPokemon } from "../../actions/index";
import {useDispatch, useSelector} from 'react-redux'
import estilos from '../../Estilos/Create.module.css'
import pika from '../../Imagenes/null.gif'


export default function CreatePokemon(){

    function Validation(input){
        
        let error = {required: false};
        console.log(error)
        if(!input.name){
            error.name = 'Por favor ingrese el nombre del Pokemon'
            error.required = true;
        } else if (!/\S{1,15}[^0-9]/.test(input.name)){
            error.name = 'El nombre no es válido. Debe contener de 2 a 15 caracteres';
            error.required = true
        }
        
        if(input.hp <= 0 || input.hp > 150){
            error.hp = 'Salud debe ser mayor que 0 pero no exceder los 150 puntos'
            error.required = true
        }
        
        if(input.attack <= 0 || input.attack > 150){
            error.attack = 'Ataque debe ser mayor que 0 pero no exceder los 150 puntos'
            error.required = true
        }
    
        if(input.defense <= 0 || input.defense > 150){
            error.defense = 'Defensa debe ser mayor que 0 pero no exceder los 150 puntos'
            error.required = true
        }
    
        if(input.speed <= 0 || input.speed > 150){
            error.speed = 'Velocidad debe ser mayor que 0 pero no exceder los 150 puntos'
            error.required = true
        }
    
        if(input.weight <= 0 || input.weight > 150){
            error.weight = 'Peso debe ser mayor que 0 pero no exceder los 150 puntos'
            error.required = true
        }
        if(input.height <= 0 || input.height > 150){
            error.height = 'Altura debe ser mayor que 0 pero no exceder los 150 puntos'
            error.required = true
        }
        
        return error;
    }
    

    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types)
    

    const [error, setError] = useState({required: true});

    const [input, setInput] = useState({
        name: '',
        img: pika,
        types: [],
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        weight:0,
        height:0
    })


    function handleChange(event){
        setInput({
            ...input, [event.target.name]:event.target.value 
        })
        
        let objError = Validation({...input, [event.target.name] : event.target.value})
        setError(objError)
    }

    function handleSelect(event){
        setInput({
            ...input, types: [...input.types, event.target.value] 
        })
        let objError = Validation({...input, [event.target.name] : event.target.value})
        setError(objError)
    }

    useEffect(()=>{
        if(input.types.length === 0){
            setError({...error, required: true, types: 'Elija al menos un tipo'})
        } 
    }, [input.types, error.required])

    function handleSubmit(event){
        if(error.required){
            event.preventDefault()
            alert('Debes completar toda la información requerida')
        } else { event.preventDefault();
            dispatch(postPokemon(input))
            alert('Pokemon creado con éxito!!')
            setInput({
                name: '',
                img:'',
                types: [],
                hp:0,
                attack:0,
                defense:0,
                speed:0,
                weight:0,
                height:0
            })}
           
       
    }

    function handleDelete(option){
        setInput({
            ...input,
            types: input.types.filter(types=>types !== option)
        })
    }


    
    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch])



    
    return(
        
        <div className={estilos.contenedorGral}>
            
            <h2 >Crea tu pokemon!</h2>
           
            <form className={estilos.formulario} onSubmit={event=>handleSubmit(event)}>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Nombre:</label>
                    <input className={estilos.input} types="text" value={input.name} name='name' placeholder="Enter a name" onChange={handleChange}/>
                    {!error.name ? null : (<span className={estilos.span}>{error.name}</span>)}
                </div>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Imagen:</label>
                    <input  className={estilos.input} types='text' value={input.img} name='img' placeholder="Enter a URL" onChange={handleChange}/>
                </div>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Salud:</label>
                    <input  className={estilos.input} types='number' value={input.hp} name='hp' placeholder="Enter a value" onChange={handleChange}/>
                    {!error.hp ? null : (<span className={estilos.span}>{error.hp}</span>)}
                </div>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Ataque:</label>
                    <input  className={estilos.input} types='number' value={input.attack} name='attack' placeholder="Enter a value" onChange={handleChange}/>
                    {!error.attack ? null : (<span className={estilos.span}>{error.attack}</span>) }
                </div>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Defensa:</label>
                    <input  className={estilos.input} types='number' value={input.defense} name='defense' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.defense ? null : (<span className={estilos.span}>{error.defense}</span>)}
                </div>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Velocidad:</label>
                    <input  className={estilos.input} types='number' value={input.speed} name='speed' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.speed ? null : (<span className={estilos.span}>{error.speed}</span>)}
                </div>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Peso:</label>
                    <input  className={estilos.input} types='number' value={input.weight} name='weight' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.weight ? null : (<span className={estilos.span}>{error.weight}</span>)}
                </div>
                <div className={estilos.contenedorInputs}>
                    <label htmlFor="">Altura:</label>
                    <input  className={estilos.input} types='number' value={input.height} name='height' placeholder="Enter a value"onChange={handleChange}/>
                    {!error.height ? null : (<span className={estilos.span}>{error.height}</span>)}
                </div>
                <div className={estilos.contenedorInputs}>
                    <label >Tipos:</label>
                    <select onChange={event=>handleSelect(event)}>
                    {types &&
                        types.map((types) => {
                        return (
                            <option cvalue={types.name} key={types.name}>
                                {types.name}
                            </option>
                        );
                        })}
                    </select>
                    {!error.types ? null : (<span className={estilos.span}>{error.types}</span>)}
                </div>

                <div className={estilos.contenedorSeleccion}>
                  {input.types.map((el) => {
                    return (
                        <div className={estilos.contenedorSeleccionContenido} key={el}>
                            <h4 className={estilos.contenedorSeleccionContenidoTitulo} >{el}</h4>
                            <button className={estilos.delete} onClick={() => {handleDelete(el)}}>x</button>
                        </div>
                    );
                  })}
                </div>
                

                <button className={estilos.button} types="submit">Crear tu Pokemon!</button>

            </form>
            <Link to='/Home'><button className={estilos.button}>Volver al Home</button></Link>
        </div>
    )
}