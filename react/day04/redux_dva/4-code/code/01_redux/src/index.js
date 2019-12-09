import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 1: 引入redux中的createStroe
import { createStore } from 'redux';
// 2: 引入react-redux中的Provider组件 作为中间衔接部分
import { Provider } from 'react-redux';

// 2,5创建搬货的人
let reducer = function(state={num:0},action){
    // 根据不同的指令做不同的行为,最终返回出不同的数据(新的数据，不能返回原来的state)
    switch(action.type) {
        case 'ADD':
            return { num:state.num + 1 };
        // 需要给一个默认
        default :
            return {...state};
    }
}

// 3: 创建仓库
let store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch({type:'ADD'});
store.dispatch({type:'ADD'});
store.dispatch({type:'ADD'});
store.dispatch({type:'ADD'});

// 4:利用供应商使用仓库
ReactDOM.render(<Provider store={store}>
            <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
