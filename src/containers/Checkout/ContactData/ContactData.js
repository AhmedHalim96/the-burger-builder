import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from  './ContactData.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import {updateObject , checkValidity} from '../../../shared/utility'



class ContactData extends Component {
    state ={
        infoForm:{
                name: {
                    elementType:'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false
                },
                street:{
                    elementType:'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false
                },
                zipCode:{
                    elementType:'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value:'',
                    validation:{
                        required: true,
                        minLength:5,
                        maxLength:5,
                        isNumeric: true
                    },
                    valid:false,
                    touched: false
                },
                country:{
                    elementType:'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false
                },
                email:{
                    elementType:'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: '',
                    validation: {
                        required:true,
                        isEmail: true
                    },
                    valid:false,
                    touched: false
                },
                deleviryMethod:{
                    elementType:'select',
                    elementConfig: {
                       options:[
                        //    {value:'', displayValue:'Choose a method'},
                           {value:'fastest', displayValue:'Fastest'},
                           {value:'cheapist', displayValue:'Cheapist'}
                        ]
                        
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                }
            
        }, 
        formIsValid: false
        
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {}
        for(let ID in this.state.infoForm){
            formData[ID] = this.state.infoForm[ID].value;
        }
        
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            formData,
            userId: this.props.userId     
        }
        this.props.onOrderBurger(order, this.props.token);
       
    }
    
    inputChangedHandler = (event, ID) =>{

        const updatedElement = updateObject(this.state.infoForm[ID], {value: event.target.value, valid: checkValidity(event.target.value, this.state.infoForm[ID].validation), touched: true})
        const updatedInfoForm = updateObject(this.state.infoForm, {[ID]: updatedElement})
        

        let formIsValid = true;
        for(let ID in updatedInfoForm){
            formIsValid = updatedInfoForm[ID].valid && formIsValid
        }
        
        this.setState({
            infoForm: updatedInfoForm,
            formIsValid: formIsValid
        });
    }

   

    render(){
        const formElementsArray = [];
        for (let key in this.state.infoForm){
            formElementsArray.push({
                id: key,
                config: this.state.infoForm[key]
            });
        }
        // console.log(formElementsArray)
        
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el =>(
                    <Input  
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value}
                        key={el.id}
                        label={el.id}
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                     />
                ) )}
                            
                <Button disabled={!this.state.formIsValid} ButtonType='Success' clicked={this.orderHandler} >ORDER</Button>
            </form>
            );
        if (this.props.loading){
            form=(<Spinner/>);
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact info</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
} 

const mapDispatchToProps = dispatch =>{
    return{
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

    }
}

export default  connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));