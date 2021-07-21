import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';

class OrderSummary extends Component{
    
    // componentWillUpdate(){
    //     console.log('OrderSummary Update')
    // }
    
    render(){
        const ingredientSummary =  Object.keys(this.props.ingredients).map(igKey => {
            return  (<li key={igKey}>
                        <span style={{textTransform:'capitalize'}} >{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>);
        });
        return(<Aux>
                    <h3>Your Order</h3>
                    <p>A Delicious Burger with the following ingredients:</p>    
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p>Total Price: <strong>{this.props.price.toFixed(2)}$</strong></p>
                    <p>Continue to Checkout</p>
                    <Button ButtonType='Danger' clicked={this.props.cancel} >Cancel</Button>
                    <Button ButtonType='Success' clicked={this.props.purchased} >Purchase</Button>

            </Aux>);
    }
}

export default OrderSummary;