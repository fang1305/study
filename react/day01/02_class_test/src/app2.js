import React,{ Component } from 'react';

// 声明并导出
export default class App extends Component {
    constructor(){
        super();
        this.state={
            num: 3
        }
        // 初始化函数的指向
        this.addNum = this.addNum.bind(this);
    }
    addNum(e){
        console.log(e)
        // console.log(this)
        this.setState({
            num: this.state.num + 1
            // num: this.state.num+1
        })
    }
    render(){
        return (
            <div>
                <span>{this.state.num}</span>
                <button onClick={ this.addNum }>点我加1</button>
            </div>
        )
    }
}