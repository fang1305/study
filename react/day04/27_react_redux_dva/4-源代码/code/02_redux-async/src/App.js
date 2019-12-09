import React, { Component } from 'react';
// 将组建与store连接
import { connect } from 'react-redux';
import './App.css';
import { ADD_NUM  } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <React.Fragment>
          <h1>{this.props.num}</h1>
          <button onClick={ e => this.addNum() }>改变Num</button>
      </React.Fragment>
    );
  }
  addNum() {
    // dispatch提交
    // console.log(this.props.store.dispatch); // 常规提交方式 比较麻烦，课上没有演示出来
    // this.props.add 这样简单很多
    this.props.add(ADD_NUM(10));
  }
}
function getstate(state){
  console.log(state);
  return {
    num : state.reducer1.num
  }
}
function dispatchs(dispatch,store){
  // 不用区分那个dispatch,直接按action来区分
  return {
    add: function (...action) {
      dispatch(...action);
    }
  }
}
              // 1:获取便捷，2：dispatch便捷
export default connect(getstate,dispatchs)(App);
