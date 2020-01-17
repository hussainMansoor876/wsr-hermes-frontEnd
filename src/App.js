import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login/Login'


import './assets/scss/DefaultTheme.scss'

class App extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <Login />
    )
  }
}

export default App;
