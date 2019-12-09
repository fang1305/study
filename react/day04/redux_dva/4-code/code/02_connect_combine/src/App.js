import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
// 1：再组件中引入connect 对象
import { connect } from 'react-redux';
import Son from './Son.js'

class App extends Component {
  render() {
    console.log(this.props);
    return (
     <React.Fragment>
        展示Num数据: {this.props.num}
        <button onClick={e=> this.props.dispatch({type:'ADD',num:5}) }>数量加一</button>
        <hr/>
        <Son/>
     </React.Fragment>
    );
  }
}


let getStateProps = function(state){
    console.log(state);
    return {
      num:state.goodsReducer.num
    }
}

export default connect(getStateProps)(App);
