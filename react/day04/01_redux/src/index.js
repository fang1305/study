import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store/index';
import * as serviceWorker from './serviceWorker';

// const store = Store({
//     isLogin: false,
// })
// // 聚合以前 user reducer 的数据
// state = {
//     isLogin: false
// }
// // 聚合以后,显示user的再是city 的
// state = {
//     user: {
//         isLogin: false
//     },
//     city: {
//         isLogin: true
//     }
// }
const store = Store({
    user:{
        loading: true,
        isLogin: false,
    },
    city: {
        '029':"先"
    }
})
ReactDOM.render(<Provider store={store}>
    <App />
</Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
