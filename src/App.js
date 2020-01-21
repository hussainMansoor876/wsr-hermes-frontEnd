import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Config/routes'
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 3000,
  draggable: true,
})



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
