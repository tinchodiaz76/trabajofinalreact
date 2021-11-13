import {createStore, combineReducers, compose, applyMiddleware } from 'redux';
/*THUNS se usa para la PROMESAS*/
import thunk from 'redux-thunk';
/*Siempre importamos a todos los REDUCERS que queramos storear*/
import loginReducer from './loginDuck';
 
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducers =combineReducers ({
    loginreducer: loginReducer, /*Aca se indican todos los reducers*/
});

const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    
    const store= createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
    
    return store;
};

