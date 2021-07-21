import React from 'react';

import classes from './CheckoutSummary.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Thanks for buying our Burger!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button ButtonType="Danger" clicked={props.cancel} >Cancel</Button>
            <Button ButtonType="Success" clicked={props.continue} >Continue</Button>

        </div>
    )
}

export default checkoutSummary;