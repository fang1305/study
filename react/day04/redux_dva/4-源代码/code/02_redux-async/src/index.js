import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore,combineReducers,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger()



let reducer1 = function (state={num:1},action) {
  switch(action.type) {
    case 'ADD':
      return { num: state.num + action.payload};
    default :
      return { num: state.num };
  }
}
let reducer2 = function (state={num:1},action) {
  switch(action.type) {
    case 'SUB':
      return { num2: state.num - action.payload};
    default :
      return { num2: state.num };
  }
}

let reducer = combineReducers({
  reducer1,reducer2
});





let store = createStore(reducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ));
// console.log(store.getState());
// // dispatch
// store.dispatch({type:'ADD',payload:5});

// // 获取state    store.getState();
// console.log(store.getState());

ReactDOM.render(<Provider store={store}>
                  <App />
              </Provider>, document.getElementById('root'));
registerServiceWorker();
