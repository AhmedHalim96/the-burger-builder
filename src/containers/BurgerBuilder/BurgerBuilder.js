import React, {Component} from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
// import * as actionTypes from "../../store/actions/actionTypes";




export class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }
    
    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchased(ingredients){
        const ingredientKeys = Object.keys(ingredients)
        let c =0;
        ingredientKeys.map((igkey) => c += ingredients[igkey] )
        return c>0
    }

    purchaseButtonHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
            this.props.onAuthRedirectPath('/checkout')
        }
    }
    
    purchaseModalHandler = () => {

        this.setState(
            (prevState) => {
                return {purchasing: !prevState.purchasing}
            });
    }

    purchaseHandler = () =>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<= 0
        }

        let orderSummury = null;
        let burger = this.props.error? <p style={{textAlign:'center', fontSize:'3rem',color:'white',background:'black', padding:'15px'}}>Network Error!! please reload the page!!</p>: <Spinner/>;
        if (this.props.ings){
            burger = (
                <Aux>
                   <Burger ingredients={this.props.addedIngredients}  />
                    
                    <BuildControls add={this.props.onIngredientAdded} remove={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    disableOrderButton = {!this.updatePurchased(this.props.ings)} 
                    purchasing={this.purchaseButtonHandler}
                    isAuth={this.props.isAuth}
                    />  
                </Aux>
            );
            orderSummury= ( <OrderSummary ingredients={this.props.ings}
                purchased={this.purchaseHandler}
                cancel={this.purchaseModalHandler}
                price={this.props.price}
                />);
        }
        return(
            <Aux>           
               
               <Modal show={this.state.purchasing} close={this.purchaseModalHandler}>
                  {orderSummury}
               </Modal>

                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state =>  {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        addedIngredients: state.burger.addedIngredients,
        isAuth: state.auth.token !== null     
    }

}


const mapDispatchToProps = dispatch => {
    return{
        onInitIngredients: () => dispatch(actions.initIngredients()),       
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthRedirectPath: (path) => dispatch(actions.authRedirectPath(path))
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));