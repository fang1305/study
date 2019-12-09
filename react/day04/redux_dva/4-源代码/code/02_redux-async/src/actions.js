
import Axios from 'axios';
const ADD = 'ADD';  // actionTypes
const SUBSTRACT = 'SUBSTRACT';  // actionTypes


export const ADD_NUM = function(num) {

  // return一个函数(dispatch)
  // return 一个Promise Axios.get('/')
  // 在then( res =>  dispatch(res.data) )

  return dispatch => {
    return Axios.get('./1.json')
    .then(res=> {
      dispatch({ type:ADD,payload:res.data  })
    })
  }
  // return {
  //   type:ADD,
  //   payload:num
  // }
}