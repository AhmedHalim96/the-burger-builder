import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
// import ToggleButton from '../ToggleButton/ToggleButton';

const sideDrawer = ( props ) => {

    return(
        <Aux>
           
            <Backdrop show={props.show} onClick={props.closed}/>
            <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')} onClick={props.closed}>
                {/* <ToggleButton toggle={props.closed}/> */}
                <Logo height='8%' className={classes.logo} />
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;