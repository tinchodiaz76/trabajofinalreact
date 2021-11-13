import {React, useState} from "react";
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/index';
import {Provider} from 'react-redux';
import generateStore from './redux/store';

const store= generateStore()

function App() {
  return (
    <Provider store={store}>
      <Login/>
    </Provider>
  );
}

export default App;
