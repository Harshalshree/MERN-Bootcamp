import React from 'react'
import logo from './logo.svg'
import './App.css'

class App extends React.Component {
  render(){
    return(
      <div>
        <img src={logo} className="App-logo"/>
        <h1 className="App-title">ToDo App</h1>
      </div>
    )
  }
}

export default App