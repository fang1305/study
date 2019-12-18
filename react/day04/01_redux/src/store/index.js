import { createStore,applyMiddleware,compose } from 'redux';
// 注册中间件, 可以把发出的action拦截下来
import thunkMiddleware from 'redux-thunk';
// redux中只维护一个store树， 这个树下存储各个模块的state

// reducer聚合前
// import reducer from '../reducers/user';
// reducer聚合过后
import reducer from '../reducers';

// const 
// compose: 把第三方对redux的扩展聚合起来

export default function Store(initState) {
    return createStore(reducer, initState, applyMiddleware(thunkMiddleware))
}
// 扩展程序
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__{}
// createStore第三个参数聚合实现: compose(applyMiddleware(thunkMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__{})
 