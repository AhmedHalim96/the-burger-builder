import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    
    
    // let transIngredients = Object.keys(props.ingredients) 
    // .map(igKey =>{
    //     return [...Array(props.ingredients[igKey])].map((_,i) => {
    //         return <BurgerIngredient key={igKey + i } type={igKey} />;
    //     });
    // } ) 
    // .reduce((arr, el) => {
    //     return arr.concat(el)
    // },[]);
    // // console.log(transIngredients);

   

    let transIngredients = props.ingredients.map(el => {
        return (
            <BurgerIngredient key={Math.random().toString(36).substr(2, 5)} type={el} />
        );
    });

    if ( transIngredients.length === 0 ){
        transIngredients = <p>Please Start adding ingredients</p>
    }
    return (
        <div className={classes.burger}>
            <BurgerIngredient type='bread-top'/>
            
            {transIngredients}

            <BurgerIngredient type='bread-bottom'/>

        </div>
    );
}

export default burger