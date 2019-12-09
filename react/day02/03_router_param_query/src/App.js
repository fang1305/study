import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { HashRouter,BrowserRouter as Router,Route,NavLink,Switch,Redirect } from 'react-router-dom';

class User extends Component{
    // 以下声明的是class的内部成员属性
    componentDidMount(){
        console.log(this.props)
    }
    goBack() {
        this.props.history.goBack();  // goForward() 前进
    }
    render(h) {
        return (
            <div> 
            <h2>nihao </h2>
            <button onClick={e=>this.goBack()}>返回||前进</button>
            </div>
         )
    }
}

function App() {
    let pathObj = {
        pathname: '/user/9'
    }
    // let pathObj = {
    //     pathname: '/user',
    //     params: {
    //         id: 1
    //     }
    // }
    let queryObj = {
        pathname: '/userq',
        query: {
            id: 22
        }
    }
    let pathObj1 = `/user/${JSON.stringify({id: 1,name: 'rose'})}`;
    let pathObj2 = {
        pathname: '/userq',
        search: '?id=8',
        state: {name:'jack'},
        query: {sex: '000'}
    }
  return (
    <div className="App">
        <h1>头部</h1>
        <Router>
            <React.Fragment>
                <NavLink to={pathObj}>gogoogooo</NavLink>
                <p></p>
                <NavLink to="/user">gogoogooo</NavLink>
                <Route path='/user/:id' component={User}  />
                <hr/>
                <NavLink to={queryObj}>queryObj</NavLink>
                <p></p>
                <NavLink to={pathObj1}>queryObj1</NavLink>
                <p></p>
                <NavLink to={pathObj2}>queryObj2</NavLink>
                <p></p>
                <NavLink to="/userq?id=1">gogoogoooQuery</NavLink>
                <Route path='/userq' component={User}  />
                <hr/>

            </React.Fragment>
        </Router>
        <h1>底部</h1>
    </div>
  );
}

export default App;
