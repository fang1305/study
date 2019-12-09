import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import action from './actions.js'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    let { num } = this.props;
    return (
      <div className="App">
            {num}
            <button onClick={e=> this.props.dispatch(action(true))}>点我异步减去数量</button>
      </div>  
    );
  }
}

export default connect(state=>{
    return {
        num:state.num
    }
})(App);
