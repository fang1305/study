import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import router from './routers'; // 默认查找index.js
import modelIndex from './models'; // 默认查找index.js

import createHistory from 'history/createBrowserHistory';

// 搭建环境
// (1) 引入dva
import dva from 'dva';
// (2) 创建dva的实例app对象
let app = new dva({
    // 声明history
    history: createHistory()
});
// (3) 配置路由app.router(fn)
app.router(router); //-- 函数
// (4) app.use() 安装插件
// (5) 注册模块, app.module({}); {state,effects,reducers}
app.model(modelIndex); // --对象
// (6) app.start('#root')
app.start('#root');



// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
