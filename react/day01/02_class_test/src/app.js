import React,{ Component } from 'react';
import logo from './logo.svg';
import './app.css';
// 生命周期
class App extends Component {
    shouldComponentUpdate(){
        console.log('update1: shouldComponentUpdate');
        return false;
    }
    componentWillUpdate(){
        console.log('update2: componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('update4: componentDidUpdate');
    }
    componentDidMount(){
        // 数据已经装载,网上流传会二次render
        // 实际应用发网络请求
        console.log('4: componentDidMount');
    }
    componentWillMount(){
        // 官方不推荐此处发请求,可能会造成渲染阻塞
        console.log('2:componentWillMount');
    }
    constructor(){
        console.log('1:constructor');
        super();
        this.state = {
            num: 1
        }
    }
    render(){
        // 可以实现渲染过滤
        console.log('3/update3: render');
        return (
            <div>
                { this.state.num }
                <button onClick={ e=>this.setState({num: 99}) }>更改数据</button>
            </div>
        )
    };
}
export default App;