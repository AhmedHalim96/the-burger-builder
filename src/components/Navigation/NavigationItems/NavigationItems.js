import React from 'react';
import classes from './NavigationItems.css';
import  NavigationItem  from "./NavigationItem/NavigationItem";

const logout = (<NavigationItem link='/logout'>Logout</NavigationItem>);
const login = <NavigationItem link='/auth' >AUTH</NavigationItem>;
const orders = <NavigationItem link='/orders' >ORDERS</NavigationItem>;
const navigationItems = ( props ) =>(
    <ul className={classes.NavigationItems} >
        <NavigationItem link='/' exact>BurgerBuilder</NavigationItem>
        { props.isAuth ? orders :  null}        
        { !props.isAuth ? login :  logout}
    </ul>
);

export default navigationItems;