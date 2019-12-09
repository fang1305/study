import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
// Route相当于规则+ 坑
import { HashRouter,BrowserRouter as Router,Route,NavLink,Switch,Redirect } from 'react-router-dom';
class Man extends Component {
    render(){
        return <h3>男</h3>
    }
}
class Woman extends Component {
    render () {
        return <h3>女</h3>
    }
}
class Home extends Component{
    render(h) {
        return (
            <div>
                <h1>shouye</h1>
                <h2>可变内容</h2>
                {/* Switch只横向匹配一个,被包裹的路由,从上到下选择一个 */}
                <Switch>
                    <Route path="/a/man" component={Man} />
                    <Route path="/a/man" component={Man} />
                </Switch>
                <Route path="/a/woman" component={Woman} />
            </div>
        )
    }
}

class App extends Component {
    render() {
        // exact 精确匹配
        return (
            <div className="App">
                <h1>头部</h1>
                <div className="App-header">
                    <Router>
                        <NavLink to="/a/man" activeStyle={{ color: '#FFF' }}>样式</NavLink>
                        <NavLink to="/a/woman" activeClassName="selected">类名</NavLink>
                        <React.Fragment>
                            <Route path="/" exact component={Home} />
                            <Route path="/a" component={Home} />
                            <Redirect to="/"></Redirect>
                        </React.Fragment>
                    </Router>
                </div>
                <h1>底部</h1>
            </div>
        );
    }
}

export default App;
