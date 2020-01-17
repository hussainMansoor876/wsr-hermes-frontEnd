import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login/Confirm'


import './assets/scss/DefaultTheme.scss'

class App extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <Login />
      </div>
    )
  }
}

export default App;
