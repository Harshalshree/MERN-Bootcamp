import React from 'react'
import logo from './logo.svg'
import './App.css'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      newItem: "",
      list: []
    }
  }

  addItem(todoValue){
    if(todoValue !== ""){
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
      }
      const list = [...this.state.list]
      list.push(newItem)
    }
  }

  render(){
    return(
      <div>
        <img src={logo} className="App-logo"/>
        <h1 className="app-title">ToDo App</h1>
        <div className="container">
          <br/>
          <input type="text" className="input-text" placeholder="Write a ToDo"/>
          <button className="add-btn">Add ToDo</button>
          <div className="list">
            <ul>
              <li>
                <input type="checkbox"/>
                Record youtube videos
                <button className="btn">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App