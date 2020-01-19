import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Config/routes'


import './assets/scss/DefaultTheme.scss'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div style={{ backgroundColor: '#263237' }}>
        <Routes />
      </div>
    )
  }
}

export default App;
