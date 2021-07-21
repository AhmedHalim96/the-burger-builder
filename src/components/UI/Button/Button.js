import React from 'react';
import classes from './Button.css';

const button = ( props ) => {
    const buttonClasses = [classes.Button, classes[props.ButtonType]];
    return(
     <button 
     disabled={props.disabled}
     onClick={props.clicked} 
     className={buttonClasses.join(' ')} 
     >{props.children}</button>
);
}

export default button;