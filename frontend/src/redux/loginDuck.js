import axios from 'axios';

//Constantes
const initialValues={
    login:false
}

const LOGIN='LOGIN';

//Reducers Los REDUCERS modifican el state
export default function loginReducer(state= initialValues, action){
    switch(action.type){
        case LOGIN:
            return {...state, login: action.payload.login}
        default:
            return state
    }
}

//Acciones
/*Los primeros dos parentesis reciben parametros de entrada*/
/*Lo segundos dos parentesis son parametros de salida*/
export const LoginAccion = (logueado)=> async (dispatch, getState)=>{
    dispatch({
        type: LOGIN, 
        payload:{login:logueado}
    })
}
/*
export const LogoutAccion = (logueado)=> async (dispatch, getState)=>{
    dispatch({
        type: SIGNOUT, 
        payload:{login:logueado}
    })
}
*/