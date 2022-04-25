import React from "react";
import styles from '../Estilos/SearchBar.module.css'

export default function SearchBar({handleChange, stateName}){

    return (
        <div className={styles.search}>
            <input className={styles.input} 
            type={'text'} 
            placeholder='Search...' 
            autoComplete='off' 
            onChange={(e)=> handleChange(e)} />
        </div>
    )
}