import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler
import Spinner from '../../components/UI/Spinner/Spinner';

import {updateObject, checkValidity} from '../../shared/utility'


class Auth extends Component{
    state = {
        controls:{
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'EMAIL ADDRESS'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'PASSWORD'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }, 
        isSignUp: true
    }

    componentDidMount(){
        // console.log(this.props)
        if (!this.props.building && this.props.path !== '/' ) {
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (event, ID) =>{
        const updatedElement = updateObject(this.state.controls[ID], {value: event.target.value, valid: checkValidity(event.target.value, this.state.controls[ID].validation), touched: true})
        const updatedInfoForm = updateObject(this.state.controls, {[ID]: updatedElement})
        this.setState({
            controls: updatedInfoForm
        });
    }

    submitHandler = ( event ) =>{
        event.preventDefault();
        this.props.onSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp, this.props.history);

    }

    switchAuthMode = (event) =>{
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = (
            <form onSubmit={this.submitHandler}>
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
                            
                <Button ButtonType='Success' clicked={this.submitHandler} >SUBMIT</Button>
                <Button ButtonType='Danger' clicked={this.switchAuthMode}>{this.state.isSignUp ? 'Switch to SignIn' : 'Switch to SignUp'}</Button>

            </form>
            );
            
        return(
           
           <div className={classes.Auth}>
                { this.props.isAuth? <Redirect to={this.props.path}/> : null }
                {this.props.error ? <p>{this.props.error.message}</p> : null}
                {this.props.loading ? <Spinner/> :  form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        building: state.burger.building, 
        path: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onSubmit: (email, password, isSignUp, history) => dispatch(actions.auth(email, password, isSignUp, history)),
        onSetAuthRedirectPath: () => dispatch(actions.authRedirectPath('/'))
    } 
}



export default connect(mapStateToProps, mapDispatchToProps)((Auth));