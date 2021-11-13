import {React, useState} from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row } from 'react-bootstrap';

import {connect} from "react-redux";
import store from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {LoginAccion, LogoutAccion} from '../../redux/loginDuck'

import Home from '../Home/index';

var baseURL = "http://localhost:3100/login";

const initialValues =  {
    usuario: '',
    clave: '',
}

const validationSchema = Yup.object().shape({
  usuario: Yup.string()
    .required("EL usuario es requerido"),
  clave: Yup.string()
    .min(3, "El Password debe tener al menos 3 caracteres")
    .required("El password es requerido")
});

const mapDispatchToProps = { LoginAccion }

const  Login = () => {


    const dispatch = useDispatch();
    const store=useSelector(store=>store);
    const store_login=useSelector(store=>store.loginreducer.login);

    console.log('store=', store);
    console.log('store_login=', store_login);

    const [loggedIn, setPost] = useState(false);

    const onSubmit = async values => {
    /*      alert(JSON.stringify(values, null, 2));*/

            const data= JSON.stringify({
              'user': values.usuario, 
              'password':values.clave,
            });

            let res=  await axios.post(baseURL, data, {
                headers: {
                'Content-Type': 'application/json'
                }
              }
            ).then((response) => {
                console.log("response", response.data);
                
                if (response.data==="ok"){
                    dispatch(LoginAccion(true));
                }
                else{
                    window.alert("El usuario no existe");
                    dispatch(LoginAccion(false));
                }

            }).catch(e => {
                console.log("Error", e);
            });

          }

  if (!store_login)
    {
      return(
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit} 
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="usuario">Usuario</label>
                    <Field
                      type="usuario"
                      name="usuario"
                      placeholder="Ingresa el Usuario"
                      className={`form-control ${
                        touched.usuario && errors.usuario ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="usuario"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="clave">Password</label>
                    <Field
                      type="clave"
                      name="clave"
                      placeholder="Ingresa el password"
                      className={`form-control ${
                        touched.clave && errors.clave ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="clave"
                      className="invalid-feedback"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Ingresar"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      )
    }
  else
    {
      return (<Home loggedIn={store_login}/>);
    };
}
 
export default connect(null, mapDispatchToProps)(Login);
