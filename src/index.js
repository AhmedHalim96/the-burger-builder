import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerReducer from './store/reducers/burgerbuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers =  process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
    burger: burgerReducer,
    order: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
                <Provider store={store}>
                <BrowserRouter><App /></BrowserRouter>
                </Provider>,
                document.getElementById('root'));
registerServiceWorker();
