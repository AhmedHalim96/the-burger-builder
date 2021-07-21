import React, {Component} from 'react';
import { connect } from 'react-redux';

// import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions';

class Checkout extends Component{

    cancelOrderHandler = () => {
        this.props.history.goBack()
    }
    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-info')
    }
 
    render(){  
        const summary = (<CheckoutSummary 
                    ingredients={this.props.addedIngredients}
                    cancel={this.cancelOrderHandler}
                    continue={this.continueOrderHandler}
                    />);
        
        return(
            <div>        
                {this.props.purchased ? <Redirect to='/'/> : null}
                {this.props.ingredients ? summary : <Redirect to ="/"/>}
                <Route path={this.props.match.path + '/contact-info'} component={ContactData} />
            </div>
            
        );
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        addedIngredients: state.burger.addedIngredients,
        purchased: state.order.purchased
    }
} 


export default connect(mapStateToProps) (Checkout);
