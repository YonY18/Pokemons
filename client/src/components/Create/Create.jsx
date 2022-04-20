/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes } from "../../actions";

import pika from '../../Imagenes/null.gif'

export default function Create() {
  const validate = (input) => {
      let error
      if (!input.name) {
          error = 'Insert Name'
      }
      return error;
  }

  async function postPokemons(a) {
    const urlLocal = await axios.post('http://localhost:3001/pokemons', a);
    return urlLocal;
}

  const dispatch = useDispatch()
  const [valTypes, setValTypes] = useState([]);
  const [poke, setPoke] = useState({
      name: '',
      img: pika,
      hp: 0,
      attack: 0,
      defense: 0,
      height: 0,
      weight: 0,
      speed: 0,
      types: []
  });


  const [errorName, setErrorName] = useState('');
  const [succes, setSucces] = useState('');
  const [err, setErr] = useState('');
  const [types, setTypes] = useState([]);
  const storeType = useSelector(store => store.types);


  useEffect(() => {
    dispatch(getTypes());

}, [dispatch]);

useEffect(() => {
    setTypes(storeType);
}, [storeType]);

useEffect(() => {
    setPoke({ ...poke, types: valTypes });
}, [valTypes]);

const send = (el, event) => {
    if (el.name !== '') {
        let res = handleSubmit(event);
        setSucces('Success');
        console.log(res);
    } else {
        event.preventDefault();
        setErr('error');
    }
}

const handleType = (change) => {
  if (change.target.checked) {
      setValTypes([change.target.value, ...valTypes]);
  } else {
      setValTypes(valTypes.filter(el => el !== change.target.value));
  }
}

const handleName = (change) => {
  setSucces('');
  setErr('');
  setPoke({ ...poke, name: change.target.value });
  setErrorName(validate({ ...poke, name: change.target.value }));
}

const handleHp = (change) => {
  setPoke({ ...poke, hp: change.target.value });
}

const handleAttack = (change) => {
  setPoke({ ...poke, attack: change.target.value });
}

const handleDefense = (change) => {
  setPoke({ ...poke, defense: change.target.value });
}

const handleWeight = (change) => {
  setPoke({ ...poke, weight: change.target.value });
}

const handleHeight = (change) => {
  setPoke({ ...poke, height: change.target.value });
}

const handleSpeed = (change) => {
  setPoke({ ...poke, speed: change.target.value })
}

const handleSubmit = (submit) => {
  submit.preventDefault();
  let upload = postPokemons(poke);

  setPoke({
      name: '',
      img: '',
      hp: 0,
      attack: 0,
      defense: 0,
      height: 0,
      weight: 0,
      types: []
  });
  submit.target.reset();
  return upload;
}

return(
  <div>
    <Link to= '/home'><button>Volver</button></Link>
    <h1>Crea tu Pokemon!</h1>

    <form onSubmit={(event) => send(poke, event)}>
      <div>
        <label>Nombre:</label>
        <input 
        type='text' 
        onChange={handleName} 
        placeholder='Name' 
        value={poke.name} 
        name='name' 
        />
      </div>
      <div>
        <label>Vida:</label>
        <input 
        type='number' 
        onChange={handleHp} 
        placeholder='LifePoints' 
        value={poke.hp} 
        name='lifepoints' 
        min='0' 
        />
      </div>
      <div>
        <label>Ataque:</label>
        <input type='number' 
        onChange={handleAttack} 
        placeholder='Attack Points' 
        value={poke.attack} 
        name='attack' 
        min='0' 
        />
      </div>
      <div>
        <label>Defensa:</label>
        <input 
        type='number' 
        onChange={handleDefense} 
        placeholder='Defense Points' 
        value={poke.defense} 
        name='defense' 
        min='0' 
        />
      </div>
      <div>
        <label>Peso:</label>
        <input 
        type='number' 
        onChange={handleWeight} 
        placeholder='Weight' 
        value={poke.weight} 
        name='weight' 
        min='0' 
        />
      </div>
      <div>
        <label>Altura:</label>
        <input 
        type='number' 
        onChange={handleHeight} 
        placeholder='Height' 
        value={poke.height} 
        name='height' 
        min='0' 
        />
      </div>
      <div>
        <label>Velocidad:</label>
        <input 
        type='number' 
        onChange={handleSpeed} 
        placeholder='Speed' 
        value={poke.speed} 
        name='speed' 
        min='0' 
        />
      </div>
      <label> TYPES</label>
        <div>
          {types.map((el, j) =>
          <span key={j}>
          <input 
          type='checkbox' 
          onChange={handleType} 
          value={el.name} 
          id={el.id} 
          />
          {el.name} 
          </span>
          )}
        </div>
    
        <div>{succes && <h2>Creado Correctamente</h2>}</div>
        <div>{err && <h2>OOPS... </h2>}</div>
        <div><input type='submit' value='CREATE!'/></div>

    </form>
  </div>

)
}
