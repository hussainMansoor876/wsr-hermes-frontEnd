import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login/Error500'


import './assets/scss/DefaultTheme.scss'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div style={{ backgroundColor: '#263237' }}>
        <Login />
      </div>
    )
  }
}

export default App;
