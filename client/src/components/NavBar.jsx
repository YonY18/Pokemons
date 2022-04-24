import React, {useState, useEffect} from 'react' ;
import { useDispatch, useSelector } from 'react-redux' ;
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import {filterByName} from "../actions"

export default function NavBar({allTypes, handleOrder, handleAttack, handleFilterCreated, handleFilterType}){
    const dispatch = useDispatch()
    const [stateName, setStateName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setStateName((e.target.value).toLowerCase());
        dispatch(filterByName((e.target.value).toLowerCase()));   
    }

    return(
        <>
        <div>
            <SearchBar stateName={stateName} handleChange={handleChange} />
        </div>
        <div>
            <label>Ordenar por</label>
            <select onChange={e => handleOrder(e)}>  
                <option value="asc">Aa to Zz</option> 
                <option value="desc">Zz to Aa</option> 
            </select>
            <select defaultValue ='attack' onChange={e => handleAttack(e)}>
                <option value="attack" disabled>Attack</option>
                <option value="ascendent">Low Attack</option> 
                <option value="descendent">Top Attack</option> 
            </select>
        </div>
        <div>
        <label >Filter by: </label>
            <select defaultValue ='Origin' onChange={e => handleFilterCreated(e)}>
                <option value="All">Created In</option>    
                <option value="api">Api</option> 
                <option value="createdInDb">Data Base</option> 
            </select>
                
            <select defaultValue ='Types' onChange={e=> handleFilterType(e)}>   
                <option value="Types" disabled>Types</option>
                <option value="all">All Types</option>
                    {allTypes && allTypes.map((t) => (
                <option value={t.name} key={t.name}>{t.name}</option>))}
            </select>
        </div>
        <div>
            <Link to='/create'><button>Create Pokemon</button></Link>
        </div>



        
        </>
    )
}