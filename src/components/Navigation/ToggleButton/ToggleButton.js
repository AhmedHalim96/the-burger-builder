import React from 'react';
import classes from './ToggleButton.css';

const toggleButton = ( props ) =>(
    <button className={classes.button} onClick={props.toggle}>☰</button>
);

export default toggleButton;