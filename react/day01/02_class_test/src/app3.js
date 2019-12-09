// 组件对象
// 1.使用jsx的时候必须引入React
// 2.组件要继承React.Component
import React,{ Component } from 'react';

class App extends Component {
    // 构造器
    constructor(){
        super();
        // 初始化属于自己的组件的属性
        this.state = {
            num: 1
        }
    }
    changeHandler(e){
        console.log(e.target.value)
        console.log('change触发了');
        // 方法一: 
        // this.state.num = e.target.value;
        // 通知视图更新函数
        // this.setState({});
        // 方法二: 
        this.setState({
            num: e.target.value
        });
    }
    // 指定render的内容
    render(){
        // 也要保证一个根节点
        return (
            <div>
                大家好哇{ this.state.num }
                <br />
                < input type = 'text'
                value = { this.state.num }
                onChange = {
                    (e) => {
                        this.changeHandler(e)
                    }
                }
                />
            </div>
        );
    }

}
// 导出
export default App;