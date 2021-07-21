import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from '../Aux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    toggleSideDrawerHandler = () => {
        this.setState(
            (prevState)=> {
                return {showSideDrawer: !prevState.showSideDrawer}
            })
    }
    
    render(){
        return(
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggle={this.toggleSideDrawerHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.toggleSideDrawerHandler} 
                    show={this.state.showSideDrawer}/>
                <main className={classes.content} >
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default withRouter(connect(mapStateToProps)(Layout));