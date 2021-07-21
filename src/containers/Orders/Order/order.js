import React from 'react';

import classes from  './order.css';


const order = ( props )=>{
    const ingredients=[];
    // console.log(props.ingredients)
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    // console.log(ingredients);
const igOutput = ingredients.map(ig => {
    return <span style={{padding: '5px',
                        border: '1px solid black',
                        "margin": "0 10px",
                        textTransform: 'capitalize',
                        borderRadius:'5px'}} 
                 key={ig.name+ig.amount}> 

                 {ig.name}: {ig.amount}
        </span>
})


    return(
        <div className={classes.Order}>
            <p>Ingredients:</p> <div className={classes.ings}>{igOutput} </div>
            <p>Price <strong>{props.price.toFixed(2)}$</strong></p>
        </div>
    );
}
export default order
