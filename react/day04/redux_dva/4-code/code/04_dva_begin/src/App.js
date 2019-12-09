import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// 连接组件
import { connect } from 'dva';

class App extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="App">

        {this.props.num}

        <button onClick={e=> this.change()}>更改值</button>
      </div>
    );
  }
  change() {
    // console.log(this.props)
    this.props.dispatch({type:'count/addAfter1Second',num:5});
  }
}

export default connect(state=>{
  return {
    // 注意命名空间，给错的话，页面{this.props.num}拿不到
    num:state.count.num
  };
})(App);
