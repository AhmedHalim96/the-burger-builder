import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../ToggleButton/ToggleButton';

const toolbar = ( props ) => (
    <header className={classes.Toolbar} >
        <div className={classes.none}><ToggleButton toggle={props.toggle}/></div>
        <Logo height='80%' />
        <nav className={classes.dnone}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;