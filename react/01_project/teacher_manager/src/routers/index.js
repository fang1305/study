import React from 'react';
// 配置路由规则
import {Router,Route,NavLink,Switch,Redirect} from 'dva/router';

// 引入组件
const home=()=><h1>hello</h1>;

// 返回函数
// history 在src/index声明
let fn = function ({history,app}) {
    return (
        <Router history={history}>
            <React.Fragment>
                {/* exact 不希望走嵌套路由 */}
                <Route path="/home" exact component={home}></Route>
            </React.Fragment>
        </Router>
    )
}
export default fn;