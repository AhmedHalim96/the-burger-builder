import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './Buildcontrol/BuildControl';

const controls =[
    {label: "Salad", type: 'salad'},
    {label: "Cheese", type: 'cheese'},
    {label: "Bacon", type: 'bacon'},
    {label: "Meat", type: 'meat'}
]
const buildControls = (props) =>(
    
    <div className={classes.BuildControls}>
        <p>Total Price: <strong>{props.price.toFixed(2)-.01}$</strong></p>
        <div className={classes.ControlsDiv}>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label} 
            add={() => props.add(ctrl.type)} 
            remove={() => props.remove(ctrl.type)} 
            disabled={ props.disabled[ctrl.type]}
             />)
        )}
        </div>
        <button className={classes.OrderButton} disabled={props.disableOrderButton} onClick={props.purchasing} >{props.isAuth ? "ORDER NOW" : "Sign up/ Log in to Purchase"}</button>
    </div>
);

export default buildControls;