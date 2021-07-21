import React from 'react';
import logoimg from '../../assets/images/burger-logo.png';
import classes from './Logo.css';
const logo = ( props ) => (
    <div className={classes.Logo} style={{height:props.height}} >
        <img src={logoimg} alt='Burger Logo'/>
    </div>
);

export default logo