import React,{Component} from 'react';
import { connect } from 'react-redux';

import * as userActions from './actions/user';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render(){
        console.log(this.props)
        const { user } = this.props;
        return (
            <div className="App">
                redux - test
                <div>
                    {user.isLogin?"欢迎你":'未登录'}<br/>
                    {user.loding}
                    {user.loading?"加载中":'加载完了'}
                </div>
                <button onClick={e=>this.login()}>登录</button>
                <button onClick={e=>this.loginOut()}>不登录</button>
            </div>
        );
    }
    login(){
        // 表明触发了一个修改state的操作， 且只能通过dispatch触发修改。 它的参数是一个action
        this.props.dispatch(userActions.login({
            account: 'test',
            password: 'xx'
        }))
        console.log('login')
    }
    loginOut() {
        this.props.dispatch(userActions.logout({}))
    }
}
// 从所有仓库数据拿到需要的数据
function mapStateToProps(state) {
    return { 
        user: state.user
        // ...state
    }
}
export default connect((state)=>{
    return {
        // user: state.user
        ...state
    }
})(App)
// export default connect(mapStateToProps)(App);
