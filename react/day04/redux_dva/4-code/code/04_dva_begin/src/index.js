import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import dva from 'dva';
import { Router,Route,NavLink } from 'dva/router';
import createHistory from 'history/createBrowserHistory';

const Home = () => <div>Hello dva</div>;
// // 创建应用
// const app = dva();
// // 注册视图
// app.router(() => <App />);
// // 启动应用
// app.start('#root');





// 要求是一个函数
let routers = function ({ history,app }) {
    // console.log(app); // app未来可以做路由懒加载
    return (
        <Router history={history}>
            <div>
                <Route path="/home" component={Home}/>
                <Route path="/show" component={App}/>
            </div>
        </Router>
    )
}



const app = dva({
    // 给了就是history模式，不给是hash
    history:createHistory()
});
// 配置路由
app.router(routers);
// 安装插件

// 注册仓库数据模型
app.model({
  // 区分不同的model，命名空间
  namespace: 'count',
  // 数据
  state: {
    num:0
  },
  // 改变数据
 reducers:{
    add(state,{type,num}) {
        console.log(state,num);
        return {
            num:state.num + num
        };
    }
 },
  // 异步的操作action
  effects: {
    // 只能使用generator *相当于async yield相当于await
    *addAfter1Second(action, { call, put, select }) {
        // call是调用异步函数
      let num = yield call(function(){
            return new Promise(function(resolve,reject){
                  setTimeout(function(){
                      resolve(1000)
                  },1000);
              });
      });
      // put 是调用dispatch
      yield put({ type: 'add',num });
      // select是获取state中的数据
    },
  },
});
// 启动
app.start('#root')






// ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
